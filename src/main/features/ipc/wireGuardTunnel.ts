import { type IpcMainEvent } from "electron";

import { createTunnels } from "../lib/tunnels/createTunnels";

import { CHANNELS } from "@shared/ipc/channels";
import { type AppSettingsWireGuardTunnel } from "@shared/lib/types/app-settings";
/**
 * Объект, содержащий обработчики IPC-каналов для настройки WireGuard.
 */
export const wireGuardTunnelHandlers = {
  [CHANNELS.START_TUNNEL_SETTINGS]: async (
    ipcMainEvent: IpcMainEvent,
    settingsWireGuardTunnel: AppSettingsWireGuardTunnel,
  ) => createTunnels({ ipcMainEvent, settingsWireGuardTunnel }),
};
