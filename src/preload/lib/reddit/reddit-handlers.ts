import { ipcRenderer, type IpcRendererEvent } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import {
  type ElectronAPI,
  type RedditMySubscribe,
  type RedditResponseNewRecordsData,
  type RedditResponsePreviewPayload,
  type SendRedditCollectionPayload,
} from "@shared/lib/types/electron-api";

/**
 * Создаёт объект с обработчиками событий для работы с YaP
 */
export const createRedditHandlers = () =>
  ({
    redditReceiveMyReddits: () =>
      ipcRenderer.send(CHANNELS.REDDIT_RECEIVE_MY_REDDITS),
    redditResponseMyReddits: (
      callback: (redditMySubscribe: RedditMySubscribe[]) => void,
    ) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as RedditMySubscribe[]);

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.REDDIT_RESPONSE_MY_REDDITS, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(
          CHANNELS.REDDIT_RESPONSE_MY_REDDITS,
          subscription,
        );
      };
    },
    redditReceiveNewRecords: (props) =>
      ipcRenderer.send(CHANNELS.REDDIT_RECEIVE_NEW_RECORDS, props),
    redditResponseNewRecords: (callback) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as RedditResponseNewRecordsData);

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.REDDIT_RESPONSE_NEW_RECORDS, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(
          CHANNELS.REDDIT_RESPONSE_NEW_RECORDS,
          subscription,
        );
      };
    },
    redditResponseCollection: (callback) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as SendRedditCollectionPayload);

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.REDDIT_RESPONSE_COLLECTION, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(
          CHANNELS.REDDIT_RESPONSE_COLLECTION,
          subscription,
        );
      };
    },
    redditResponsePreview: (callback) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as RedditResponsePreviewPayload);

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.REDDIT_RESPONSE_PREVIEW, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(
          CHANNELS.REDDIT_RESPONSE_PREVIEW,
          subscription,
        );
      };
    },
  }) as ElectronAPI;
