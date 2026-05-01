import { ipcRenderer } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import { type ElectronAPI } from "@shared/lib/types/electron-api";

/**
 * Создаёт объект с обработчиками событий для работы с YaP
 */
export const createTelegramHandlers = () =>
  ({
    telegramBotSendPicture: (url) =>
      ipcRenderer.send(CHANNELS.TELEGRAM_BOT_SEND_PICTURE, url),
    telegramBotSendGroup: (payload) =>
      ipcRenderer.send(CHANNELS.TELEGRAM_BOT_SEND_GROUP, payload),
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
  }) as ElectronAPI;
