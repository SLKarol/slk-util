import { type IpcMainEvent } from "electron";

import { createTunnels } from "../lib/tunnels/createTunnels";
import { saveTunnelSettings } from "../lib/tunnels/helpers/saveTunnelSettings";

import { CHANNELS } from "@shared/ipc/channels";
import { type StartTunnelSettingsPayload } from "@shared/lib/types/electron-api";
/**
 * Объект, содержащий обработчики IPC-каналов для настройки WireGuard.
 */
export const wireGuardTunnelHandlers = {
  [CHANNELS.START_TUNNEL_SETTINGS]: async (
    ipcMainEvent: IpcMainEvent,
    settingsWireGuardTunnel: StartTunnelSettingsPayload,
  ) => createTunnels({ ipcMainEvent, settingsWireGuardTunnel }),

  [CHANNELS.SAVE_TUNNEL_SETTINGS]: async (
    ipcMainEvent: IpcMainEvent,
    settingsWireGuardTunnel: StartTunnelSettingsPayload,
  ) => {
    const {
      excludeFromVpn,
      localNetworks,
      onlyThisDomains,
      siteInfoDnsServers,
    } = settingsWireGuardTunnel;

    await saveTunnelSettings({
      excludeFromVpn,
      localNetworks,
      onlyThisDomains,
      siteInfoDnsServers,
    });
    ipcMainEvent.reply(
      CHANNELS.SEND_POP_UP_MESSAGE,
      "Настройки приложения обновлены",
    );
  },
};
