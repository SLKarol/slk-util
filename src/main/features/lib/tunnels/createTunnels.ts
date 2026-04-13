import { mergeCidr } from "cidr-tools";
import whois from "whois-json";

import {
  type CreateTunnelPayload,
  type WhoIsJsonReply,
} from "../types/tunnel-ipc";

import { UserDataFileManager } from "@main/features/UserDataFileManager";
import { SETTINGS_APP } from "@main/shared/lib/constants";

import { CHANNELS } from "@shared/ipc/channels";
import { type AppSettings } from "@shared/lib/types/app-settings";
import { type IPRange } from "@shared/lib/types/tunnel";

import { calculateExcludedCidrs } from "./helpers/calculateExcludedCidrs";
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

  // Создаём Map для хранения соответствия доменов и их IP-адресов (IPv4 и IPv6)
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

  // Собираем все уникальные IP-адреса из Map в Set, беря по одному адресу на домен (первый доступный)
  const allIpAddrs = new Set<string>();

  mapDomainIpAddrs.forEach((ipRange) => {
    if (ipRange.ipv4.length > 0) {
      allIpAddrs.add(ipRange.ipv4[0]);
    } else if (ipRange.ipv6.length > 0) {
      allIpAddrs.add(ipRange.ipv6[0]);
    }
  });

  const arrayAllIpAddrs = Array.from(allIpAddrs);

  // Получаем WhoIs-записи для каждого IP-адреса, чтобы извлечь информацию об автономных системах (AS)
  const whoIsResults = await Promise.allSettled(
    arrayAllIpAddrs.map(async (ipAddr) => {
      const whoisData = await whois(ipAddr);
      return whoisData as WhoIsJsonReply;
    }),
  );

  // Извлекаем AS номера из WhoIs-данных для дальнейшего получения сетевых префиксов
  const asNumbers = new Set<number>();

  // Обрабатываем результаты WhoIs-запросов
  whoIsResults.forEach((whoisData, indexWhoIsResults) => {
    const ip = arrayAllIpAddrs[indexWhoIsResults];
    // Подготовлю сообщение об ошибке
    const errorMessage = `Не удалось получить ASN для ${ip}`;
    const errorConsoleMessage = `No ASN for IP address : ${ip}`;

    if (whoisData.status === "fulfilled") {
      if (
        "origin" in whoisData.value &&
        typeof whoisData.value.origin === "string"
      ) {
        const asNumber = Number.parseInt(
          whoisData.value.origin.replace("AS", ""),
          10,
        );
        if (!isNaN(asNumber)) {
          asNumbers.add(asNumber);
        }
      } else {
        ipcMainEvent.reply(CHANNELS.RECEIVE_CALCULATE_CIDRS_LOG, {
          dateTime: new Date().getTime(),
          log: errorMessage,
        });
        console.warn(errorConsoleMessage);
      }
    } else {
      ipcMainEvent.reply(CHANNELS.RECEIVE_CALCULATE_CIDRS_LOG, {
        dateTime: new Date().getTime(),
        log: errorMessage,
      });
      console.warn(errorConsoleMessage);
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
      ipv6Excluded: mergeCidr(prefixesForDomainsSeparate.ipv6),
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
