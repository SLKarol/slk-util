import { ipcRenderer, type IpcRendererEvent } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import {
  type ElectronAPI,
  type IreceiveYaPlakalTopic,
} from "@shared/lib/types/electron-api";

/**
 * Создаёт объект с обработчиками событий для работы с YaP
 */
export const createYaPlakalHandlers = () =>
  ({
    fetchYaPlakalTopic: (url) => {
      ipcRenderer.send(CHANNELS.FETCH_YA_PLAKAL_TOPIC, url);
    },
    receiveYaPlakalTopic: (callback) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as IreceiveYaPlakalTopic);

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.RECEIVE_YA_PLAKAL_TOPIC, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(
          CHANNELS.RECEIVE_YA_PLAKAL_TOPIC,
          subscription,
        );
      };
    },
  }) as ElectronAPI;
