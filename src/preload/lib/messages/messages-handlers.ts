import { ipcRenderer, type IpcRendererEvent } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import { type ElectronAPI } from "@shared/lib/types/electron-api";

/**
 * Создаёт объект с обработчиками событий для всплывающих сообщений и ошибок.
 * @returns Объект с методами API, связанными с отображением сообщений.
 */
export const createMessagesHandlers = () =>
  ({
    onReceivePopErrorMessage: (callback) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as string);

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.SEND_POP_UP_ERROR, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(CHANNELS.SEND_POP_UP_ERROR, subscription);
      };
    },

    onReceivePopMessage: (callback) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as string);

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.SEND_POP_UP_MESSAGE, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(CHANNELS.SEND_POP_UP_MESSAGE, subscription);
      };
    },
  }) as ElectronAPI;
