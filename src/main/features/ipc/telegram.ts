import { type IpcMainEvent } from "electron";

import { downloadAndCacheFile, getDefaultSettings } from "../lib/helpers";
import { TelegramBot } from "../TelegramBot";
import { UserDataFileManager } from "../UserDataFileManager";

import { CHANNELS } from "@shared/ipc/channels";
import { type AppSettings } from "@shared/lib/types/app-settings";
import {
  type TelegramBotSendPicturePayload,
  type TelegramBotSendVideoPayload,
} from "@shared/lib/types/electron-api";

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
        waitSeconds: settingsData.telegram.waitSeconds,
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
    holidayName: string | null = null,
  ) => {
    try {
      const settingsData = await settingsFile.readData();
      const botRunning = await telegramBot.checkIsRunning();
      if (!botRunning) {
        ipcMainEvent.reply(CHANNELS.SEND_POP_UP_ERROR, "Бот не запущен");
        return;
      }

      if (holidayName) {
        await telegramBot.sendMessageToGroups({
          message: holidayName,
          tgGroups: settingsData.telegram.telegramGroups,
          waitSeconds: settingsData.telegram.waitSeconds,
        });
      }

      await telegramBot.sendMediaRecordsToGroups({
        tgAdmin: settingsData.telegram.telegramAdmin,
        tgGroups: settingsData.telegram.telegramGroups,
        waitSeconds: settingsData.telegram.waitSeconds,
        mediaRecords,
      });
    } catch (error) {
      console.error("Error:", error);
      ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
        channel: CHANNELS.TELEGRAM_BOT_SEND_PICTURE,
        error,
      });
    } finally {
      ipcMainEvent.reply(CHANNELS.TELEGRAM_BOT_SEND_GROUP_FINISH);
    }
  },

  [CHANNELS.TELEGRAM_BOT_SEND_VIDEO]: async (
    ipcMainEvent: IpcMainEvent,
    { url, title, urlPreview, sendAsFile }: TelegramBotSendVideoPayload,
  ) => {
    try {
      const settingsData = await settingsFile.readData();
      const cacheDir = settingsData.cacheDir;

      const botRunning = await telegramBot.checkIsRunning();
      if (!botRunning) {
        ipcMainEvent.reply(CHANNELS.SEND_POP_UP_ERROR, "Бот не запущен");
        return;
      }

      let filePathHtml = "";

      if (sendAsFile)
        filePathHtml = await downloadAndCacheFile({
          url,
          cacheDir,
        });

      await telegramBot.sendVideoToGroups({
        tgAdmin: settingsData.telegram.telegramAdmin,
        tgGroups: settingsData.telegram.telegramGroups,
        waitSeconds: settingsData.telegram.waitSeconds,
        title: title ?? undefined,
        url: sendAsFile ? filePathHtml : url,
        urlPreview,
        sendAsFile,
      });
    } catch (error) {
      console.error("Error:", error);
      ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
        channel: CHANNELS.TELEGRAM_BOT_SEND_PICTURE,
        error,
      });
    }
  },

  [CHANNELS.TELEGRAM_BOT_CHANGE_TOKEN]: async (
    ipcMainEvent: IpcMainEvent,
    token: string,
  ) => {
    try {
      await telegramBot.changeToken(token);
    } catch (error) {
      ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
        channel: CHANNELS.TELEGRAM_BOT_CHANGE_TOKEN,
        error,
      });
    }
  },
};
