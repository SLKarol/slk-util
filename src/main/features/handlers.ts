import { ipcMain } from "electron";

import { requestHandlers } from "@main/features/ipc/request";

/**
 * Регистрация обработчиков ipc.
 */
export function registerHandlers() {
  Object.entries(requestHandlers).forEach(([channel, handler]) => {
    ipcMain.on(channel, handler);
  });
}
