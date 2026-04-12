import { type IpcMainEvent } from "electron";

import { createTunnels } from "../lib/tunnels/createTunnels";

import { CHANNELS } from "@shared/ipc/channels";
import { type AppSettingsWireGuardTunnel } from "@shared/lib/types/app-settings";
import { type StartTunnelSettingsPayload } from "@shared/lib/types/electron-api";
/**
 * Объект, содержащий обработчики IPC-каналов для настройки WireGuard.
 */
export const wireGuardTunnelHandlers = {
  [CHANNELS.START_TUNNEL_SETTINGS]: async (
    ipcMainEvent: IpcMainEvent,
    settingsWireGuardTunnel: StartTunnelSettingsPayload,
  ) => createTunnels({ ipcMainEvent, settingsWireGuardTunnel }),
};
