import * as dns from "dns/promises";

import { type CreateTunnelPayload } from "../types/tunnel-ipc";

import { UserDataFileManager } from "@main/features/UserDataFileManager";
import { SETTINGS_APP } from "@main/shared/lib/constants";

import { CHANNELS } from "@shared/ipc/channels";
import { type AppSettings } from "@shared/lib/types/app-settings";
import { type IPRange } from "@shared/lib/types/tunnel";

import { getIPAddresses } from "./helpers/getIPAddresses";

/**
 * Процедура настройки туннелей. Основная функция.
 */
export const createTunnels = async ({
  ipcMainEvent,
  settingsWireGuardTunnel: {
    excludeFromVpn,
    siteInfoDnsServers,
    localNetworks,
  },
}: CreateTunnelPayload) => {
  ipcMainEvent.reply(
    CHANNELS.SEND_POP_UP_MESSAGE,
    "Процесс настроек туннеля запущен",
  );
  const settingsFile = new UserDataFileManager<AppSettings>(
    "settings.json",
    SETTINGS_APP,
  );
  // Сохранить пришедшие настройки в файл
  const oldSettings = await settingsFile.readData();
  await settingsFile.writeData({
    ...oldSettings,
    wireGuardTunnel: {
      allowedIPs: "",
      excludeFromVpn,
      siteInfoDnsServers,
      localNetworks,
    },
  });
  // Создать Map по доменам и IP адресам
  const mapDomainIpAddrs = new Map<string, IPRange>();
  if (Array.isArray(excludeFromVpn) && excludeFromVpn.length > 0) {
    dns.setServers(siteInfoDnsServers);
  }

  for (const domain of excludeFromVpn) {
    const address = await getIPAddresses(domain, ipcMainEvent);
    ipcMainEvent.reply(CHANNELS.RECEIVE_DOMAIN_ADDRESS, { domain, address });
    mapDomainIpAddrs.set(domain, address);
  }

  ipcMainEvent.reply(CHANNELS.RECEIVE_STOP_TUNNEL_SETTINS);
};
