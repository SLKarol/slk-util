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
  }) as ElectronAPI;
