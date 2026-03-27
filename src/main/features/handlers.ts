import { ipcMain } from "electron";

import { banAuthorHandlers } from "@main/features/ipc/banAutor";
import { requestHandlers } from "@main/features/ipc/request";
import { settingsHandlers } from "@main/features/ipc/settings";
import { stihiRuHandlers } from "@main/features/ipc/stihiRu";

/**
 * Регистрация обработчиков ipc.
 */
export function registerHandlers() {
  // Записать в electronAPI обработчики запросов
  Object.entries(requestHandlers).forEach(([channel, handler]) => {
    ipcMain.on(channel, handler);
  });

  // Записать в electronAPI обработчики настроек
  Object.entries(settingsHandlers).forEach(([channel, handler]) => {
    ipcMain.on(channel, handler);
  });

  // Записать в electronAPI обработчики плохих авторов
  Object.entries(banAuthorHandlers).forEach(([channel, handler]) => {
    ipcMain.on(channel, handler);
  });

  Object.entries(stihiRuHandlers).forEach(([channel, handler]) => {
    ipcMain.on(channel, handler);
  });
}
