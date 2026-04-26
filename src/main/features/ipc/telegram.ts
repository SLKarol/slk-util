import { type IpcMainEvent } from "electron";

import { getDefaultSettings } from "../lib/helpers";
import { TelegramBot } from "../TelegramBot";
import { UserDataFileManager } from "../UserDataFileManager";

import { CHANNELS } from "@shared/ipc/channels";
import { type AppSettings } from "@shared/lib/types/app-settings";
import { type TelegramBotSendPicturePayload } from "@shared/lib/types/electron-api";

const settingsFile = new UserDataFileManager<AppSettings>(
  "settings.json",
  getDefaultSettings(),
);
const telegramBot = new TelegramBot();

settingsFile.readData().then((settingsData) => {
  if (settingsData.telegram.telegramToken) {
    telegramBot.changeToken(settingsData.telegram.telegramToken);
  }
});

export const telegramHandlers = {
  [CHANNELS.TELEGRAM_BOT_SEND_PICTURE]: async (
    ipcMainEvent: IpcMainEvent,
    { url, title }: TelegramBotSendPicturePayload,
  ) => {
    try {
      const settingsData = await settingsFile.readData();
      const botRunning = await telegramBot.checkIsRunning();
      if (!botRunning) {
        ipcMainEvent.reply(CHANNELS.SEND_POP_UP_ERROR, "Бот не запущен");
        return;
      }
      await telegramBot.sendPictureToGroups({
        tgAdmin: settingsData.telegram.telegramAdmin,
        tgGroups: settingsData.telegram.telegramGroups,
        title: title ?? undefined,
        url,
      });
    } catch (error) {
      console.error("Error:", error);
      ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
        channel: CHANNELS.TELEGRAM_BOT_SEND_PICTURE,
        error,
      });
    }
  },

  [CHANNELS.TELEGRAM_BOT_SEND_GROUP]: async (
    ipcMainEvent: IpcMainEvent,
    mediaRecords: TelegramBotSendPicturePayload[],
  ) => {
    try {
      const settingsData = await settingsFile.readData();
      const botRunning = await telegramBot.checkIsRunning();
      if (!botRunning) {
        ipcMainEvent.reply(CHANNELS.SEND_POP_UP_ERROR, "Бот не запущен");
        return;
      }
      await telegramBot.sendMediaRecordsToGroups({
        tgAdmin: settingsData.telegram.telegramAdmin,
        tgGroups: settingsData.telegram.telegramGroups,
        mediaRecords,
      });
    } catch (error) {
      console.error("Error:", error);
      ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
        channel: CHANNELS.TELEGRAM_BOT_SEND_PICTURE,
        error,
      });
    }
  },
};
