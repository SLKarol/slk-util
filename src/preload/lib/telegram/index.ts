import { ipcRenderer, type IpcRendererEvent } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import { type ElectronAPI } from "@shared/lib/types/electron-api";
import { SendFileStatus } from "@shared/lib/types/sendFile";

/**
 * Создаёт объект с обработчиками событий для работы с YaP
 */
export const createTelegramHandlers = () =>
  ({
    telegramBotSendPicture: (payload) =>
      ipcRenderer.send(CHANNELS.TELEGRAM_BOT_SEND_PICTURE, payload),
    telegramBotSendGroup: (pictures, holidayName) =>
      ipcRenderer.send(CHANNELS.TELEGRAM_BOT_SEND_GROUP, pictures, holidayName),
    telegramBotSendVideo: (payload) =>
      ipcRenderer.send(CHANNELS.TELEGRAM_BOT_SEND_VIDEO, payload),
    telegramBotChangeToken: (payload) =>
      ipcRenderer.send(CHANNELS.TELEGRAM_BOT_CHANGE_TOKEN, payload),
    telegramBotSendGroupFinish: (callback) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = () => callback();

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.TELEGRAM_BOT_SEND_GROUP_FINISH, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(
          CHANNELS.TELEGRAM_BOT_SEND_GROUP_FINISH,
          subscription,
        );
      };
    },
    telegramBotSendFileStatus: (callback) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (_: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as { id: string; status: SendFileStatus });

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.TELEGRAM_BOT_SEND_FILE_STATUS, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(
          CHANNELS.TELEGRAM_BOT_SEND_FILE_STATUS,
          subscription,
        );
      };
    },
  }) as ElectronAPI;
