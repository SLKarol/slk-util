import { ipcRenderer, type IpcRendererEvent } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import {
  type ElectronAPI,
  type ReceiveText,
} from "@shared/lib/types/electron-api";

/**
 * Создаёт объект с обработчиками событий для net-запросов.
 */
export const createRequestHandlers = () =>
  ({
    fetchText: (url: string) => {
      ipcRenderer.send(CHANNELS.REQUEST_TEXT, url);
    },
    onReceiveText: (callback: (receiveData: ReceiveText) => void) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as ReceiveText);

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.RECEIVE_TEXT, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(CHANNELS.RECEIVE_TEXT, subscription);
      };
    },
  }) as ElectronAPI;
