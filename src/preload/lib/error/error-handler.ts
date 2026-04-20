import { ipcRenderer, type IpcRendererEvent } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import { type ElectronAPI } from "@shared/lib/types/electron-api";

/**
 * Создаёт объект с обработчиками событий ошибки.
 */
export const createErrorHandlers = () =>
  ({
    onErrorMain: (callback: (error: unknown) => void) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0]);

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.ERROR_MAIN, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(CHANNELS.ERROR_MAIN, subscription);
      };
    },
  }) as ElectronAPI;
