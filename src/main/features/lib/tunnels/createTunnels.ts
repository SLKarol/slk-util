import { mergeCidr } from "cidr-tools";

import { type CreateTunnelPayload } from "../types/tunnel-ipc";

import { UserDataFileManager } from "@main/features/UserDataFileManager";
import { SETTINGS_APP } from "@main/shared/lib/constants";

import { CHANNELS } from "@shared/ipc/channels";
import { type AppSettings } from "@shared/lib/types/app-settings";
import { type IPRange } from "@shared/lib/types/tunnel";

import { calculateExcludedCidrs } from "./helpers/calculateExcludedCidrs";
import { resolveASNForIPs } from "./helpers/getASNumberForDomain";
import { getIPAddresses } from "./helpers/getIPAddresses";
import { getPrefixesFromAsNumbers } from "./helpers/getPrefixesFromAsNumbers";
import { separatePrefixesByVersion } from "./helpers/separatePrefixesByVersion";

/**
 * Процедура настройки туннелей. Основная функция.
 */
export const createTunnels = async ({
  ipcMainEvent,
  settingsWireGuardTunnel: {
    excludeFromVpn,
    siteInfoDnsServers,
    localNetworks,
    onlyThisDomains,
    methodExcludeDomainsFromVpn,
  },
}: CreateTunnelPayload) => {
  // Отправляем сообщение пользователю о начале процесса настройки туннеля
  ipcMainEvent.reply(CHANNELS.RECEIVE_CALCULATE_CIDRS_LOG, {
    dateTime: new Date().getTime(),
    log: "-= Процесс настроек туннеля запущен =-",
  });

  // Инициализируем менеджер для работы с файлом настроек приложения
  const settingsFile = new UserDataFileManager<AppSettings>(
    "settings.json",
    SETTINGS_APP,
  );

  // Сохраняем пришедшие настройки WireGuard туннеля в файл настроек приложения для persistence
  const oldSettings = await settingsFile.readData();
  await settingsFile.writeData({
    ...oldSettings,
    wireGuardTunnel: {
      allowedIPs: "",
      excludeFromVpn,
      siteInfoDnsServers,
      localNetworks,
      onlyThisDomains,
    },
  });
  ipcMainEvent.reply(CHANNELS.RECEIVE_CALCULATE_CIDRS_LOG, {
    dateTime: new Date().getTime(),
    log: "Настройки приложения обновлены",
  });

  /**
   * Map для хранения соответствия доменов и их IP-адресов (IPv4 и IPv6)
   */
  const mapDomainIpAddrs = new Map<string, IPRange>();

  // Комментированный код для настройки DNS-серверов, если в будущем будет использоваться dns.resolve вместо electron.net.resolveHost
  // if (Array.isArray(siteInfoDnsServers) && siteInfoDnsServers.length > 0) {
  //   dns.setServers(siteInfoDnsServers);
  // }

  const domainsForProcessing = methodExcludeDomainsFromVpn
    ? excludeFromVpn
    : onlyThisDomains;

  // Проходим по списку доменов, которые нужно исключить из VPN, и получаем их IP-адреса
  for (const domain of domainsForProcessing) {
    const address = await getIPAddresses(domain, ipcMainEvent);
    // Отправляем полученные адреса в рендерер для отображения пользователю
    ipcMainEvent.reply(CHANNELS.RECEIVE_DOMAIN_ADDRESS, { domain, address });
    mapDomainIpAddrs.set(domain, address);
  }

  const domainKays = [...mapDomainIpAddrs.keys()];
  const allSettledASNumber = await Promise.allSettled(
    domainKays.map((domain) => {
      const domainResult = mapDomainIpAddrs.get(domain);
      if (!domainResult) return null;

      if (domainResult.ipv4.length > 0) {
        return resolveASNForIPs(domainResult.ipv4);
      } else if (domainResult?.ipv6.length > 0) {
        return resolveASNForIPs(domainResult.ipv6);
      } else return null;
    }),
  );
  const asNumbers = new Set<number>();
  allSettledASNumber.forEach((result, indexDomain) => {
    if (result.status === "fulfilled") {
      if (!result.value) {
        ipcMainEvent.reply(CHANNELS.RECEIVE_CALCULATE_CIDRS_LOG, {
          dateTime: new Date().getTime(),
          log: `ASN для домена ${domainKays[indexDomain]} не найден`,
        });
      } else {
        const match = result.value.match(/AS(\d+)/i);
        const asNumber = match ? parseInt(match[1], 10) : null;
        if (!asNumber)
          ipcMainEvent.reply(CHANNELS.RECEIVE_CALCULATE_CIDRS_LOG, {
            dateTime: new Date().getTime(),
            log: `ASN для домена ${domainKays[indexDomain]} не найден`,
          });
        else asNumbers.add(asNumber);
      }
    }
  });

  // Отправляем сообщение пользователю с полученными AS номерами
  ipcMainEvent.reply(CHANNELS.RECEIVE_CALCULATE_CIDRS_LOG, {
    dateTime: new Date().getTime(),
    log: `Получены AS номера для исключения из VPN: ${Array.from(asNumbers).join(", ")}`,
  });

  // Получаем уникальные сетевые префиксы для исключения из VPN на основе AS номеров
  const prefixesForDomains = await getPrefixesFromAsNumbers(asNumbers);

  // Отправляем сообщение пользователю с количеством полученных префиксов
  ipcMainEvent.reply(CHANNELS.RECEIVE_CALCULATE_CIDRS_LOG, {
    dateTime: new Date().getTime(),
    log: `Получены префиксы по доменам. Всего : ${prefixesForDomains.size}.`,
  });

  // Разделяем префиксы на IPv4 и IPv6 для удобства дальнейшей обработки
  const prefixesForDomainsSeparate =
    separatePrefixesByVersion(prefixesForDomains);

  if (!methodExcludeDomainsFromVpn) {
    // Теперь мерджим префиксы. Думаю, что это уберёт пересечения и лишние префиксы,
    // которые уже покрываются более широкими.
    // Это должно оптимизировать список исключаемых префиксов для туннеля.
    ipcMainEvent.reply(CHANNELS.RECEIVE_CALCULATE_CIDRS, {
      ipv4Excluded: mergeCidr(prefixesForDomainsSeparate.ipv4),
      ipv6Excluded: mergeCidr([
        ...prefixesForDomainsSeparate.ipv4,
        ...prefixesForDomainsSeparate.ipv6,
      ]),
    });
  } else {
    const excludedCidrs = calculateExcludedCidrs({
      localNetworks,
      prefixesForDomainsSeparate,
    });
    ipcMainEvent.reply(CHANNELS.RECEIVE_CALCULATE_CIDRS, excludedCidrs);
  }

  // Отправляем сигнал о завершении настройки туннеля
  ipcMainEvent.reply(CHANNELS.RECEIVE_STOP_TUNNEL_SETTINS);
  ipcMainEvent.reply(CHANNELS.RECEIVE_CALCULATE_CIDRS_LOG, {
    dateTime: new Date().getTime(),
    log: "-= Процесс настроек туннеля завершён =-",
  });
};
