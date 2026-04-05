import { ipcRenderer, type IpcRendererEvent } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import {
  type ElectronAPI,
  type ReceiveOperationAuthor,
} from "@shared/lib/types/electron-api";
import { type IStatusAutoReadStihi } from "@shared/lib/types/stihi.types";

/**
 * Создаёт объект с обработчиками событий для работы с Stihi.ru.
 */
export const createStihiRuHandlers = () =>
  ({
    fetchBanAuthors: () => {
      ipcRenderer.send(CHANNELS.GET_BAN_AUTHORS);
    },

    onReceiveBanAuthors: (callback) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as string[]);

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.RECEIVE_BAN_AUTHORS, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(CHANNELS.RECEIVE_BAN_AUTHORS, subscription);
      };
    },

    stihiOpenPoem: (hrefPoem) =>
      ipcRenderer.send(CHANNELS.STIHI_OPEN_POEM, hrefPoem),
    stihiOpenAllPoems: (hrefPoems) =>
      ipcRenderer.send(CHANNELS.STIHI_OPEN_ALL_POEMS, hrefPoems),

    addBanAuthor: (author: string) =>
      ipcRenderer.send(CHANNELS.ADD_BAN_AUTHOR, author),
    removeBanAuthor: (author: string) =>
      ipcRenderer.send(CHANNELS.REMOVE_BAN_AUTHOR, author),

    stihiOpenAuthor: (authorId) =>
      ipcRenderer.send(CHANNELS.STIHI_OPEN_AUTHOR, authorId),

    onReceiveOperationAuthor: (callback) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as ReceiveOperationAuthor);

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.RECEIVE_ON_OPERATION_AUTHOR, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(
          CHANNELS.RECEIVE_ON_OPERATION_AUTHOR,
          subscription,
        );
      };
    },

    saveBansAsUblock: () => ipcRenderer.send(CHANNELS.SAVE_BANS_AS_UBLOCK),

    startStihiAutoRead: (stringDateTime) =>
      ipcRenderer.send(CHANNELS.START_STIHI_AUTO_READ, stringDateTime),
    stopStihiAutoRead: () => ipcRenderer.send(CHANNELS.STOP_STIHI_AUTO_READ),

    requestStatusAutoReadStihi: () =>
      ipcRenderer.send(CHANNELS.REQUEST_STATUS_AUTO_READ_STIHI),
    receiveStatusAutoReadStihi: (callback) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (_: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as IStatusAutoReadStihi);
      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.RECEIVE_STATUS_AUTO_READ_STIHI, subscription);
      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(
          CHANNELS.RECEIVE_STATUS_AUTO_READ_STIHI,
          subscription,
        );
      };
    },

    onReceiveStihiAutoRead: (callback) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (_: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as string);
      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.RECEIVE_REPORT_AUTO_READ_POEM, subscription);
      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(
          CHANNELS.RECEIVE_REPORT_AUTO_READ_POEM,
          subscription,
        );
      };
    },
  }) as ElectronAPI;
