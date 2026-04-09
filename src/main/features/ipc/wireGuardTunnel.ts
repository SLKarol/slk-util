import { type IpcMainEvent } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import { wait } from "@shared/lib/helpers/wait";
import { type AppSettingsWireGuardTunnel } from "@shared/lib/types/app-settings";
/**
 * Объект, содержащий обработчики IPC-каналов для настройки WireGuard.
 */
export const wireGuardTunnelHandlers = {
  [CHANNELS.START_TUNNEL_SETTINGS]: async (
    ipcMainEvent: IpcMainEvent,
    tunnelSettings: AppSettingsWireGuardTunnel,
  ) => {
    ipcMainEvent.reply(CHANNELS.SEND_POP_UP_MESSAGE, `Настройка запущена`);
    await wait(3);
    ipcMainEvent.reply(CHANNELS.RECEIVE_STOP_TUNNEL_SETTINS);
  },
};
