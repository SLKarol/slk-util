import { type IpcMainEvent } from "electron";

import {
  downloadAndCacheFile,
  getDefaultSettings,
  getHolidayMessage,
} from "../lib/helpers";
import { TelegramBot } from "../TelegramBot";
import { UserDataFileManager } from "../UserDataFileManager";

import { CHANNELS } from "@shared/ipc/channels";
import { type AppSettings } from "@shared/lib/types/app-settings";
import {
  type TelegramBotSendGroupPayload,
  type TelegramBotSendPicturePayload,
  type TelegramBotSendVideoPayload,
} from "@shared/lib/types/electron-api";
import { SendFileStatus } from "@shared/lib/types/sendFile";

const settingsFile = new UserDataFileManager<AppSettings>(
  "settings.json",
  getDefaultSettings(),
);
let telegramBot: TelegramBot;

settingsFile.readData().then((settingsData) => {
  if (settingsData.telegram.telegramToken) {
    telegramBot = new TelegramBot(settingsData.telegram.telegramToken);
  }
});

export const telegramHandlers = {
  [CHANNELS.TELEGRAM_BOT_SEND_PICTURE]: async (
    ipcMainEvent: IpcMainEvent,
    { id, url, title }: TelegramBotSendPicturePayload,
  ) => {
    try {
      const settingsData = await settingsFile.readData();
      const botRunning = await telegramBot.checkIsRunning();
      if (!botRunning) {
        ipcMainEvent.reply(CHANNELS.SEND_POP_UP_ERROR, "Бот не запущен");
        return;
      }

      ipcMainEvent.reply(CHANNELS.TELEGRAM_BOT_SEND_FILE_STATUS, {
        id,
        status: SendFileStatus.SENDING,
      });

      await telegramBot.sendPictureToGroups({
        tgAdmin: settingsData.telegram.telegramAdmin,
        tgGroups: settingsData.telegram.telegramGroups,
        title: title ?? undefined,
        waitSeconds: settingsData.telegram.waitSeconds,
        url,
      });
      ipcMainEvent.reply(CHANNELS.TELEGRAM_BOT_SEND_FILE_STATUS, {
        id,
        status: SendFileStatus.SENT,
      });
    } catch (error) {
      console.error("Error:", error);
      ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
        channel: CHANNELS.TELEGRAM_BOT_SEND_PICTURE,
        error,
      });
      ipcMainEvent.reply(CHANNELS.TELEGRAM_BOT_SEND_FILE_STATUS, {
        id,
        status: SendFileStatus.ERROR,
      });
    }
  },

  [CHANNELS.TELEGRAM_BOT_SEND_GROUP]: async (
    ipcMainEvent: IpcMainEvent,
    {
      holidayName = null,
      pictures,
      shouldWriteAboutHolidayWithAI,
    }: TelegramBotSendGroupPayload,
  ) => {
    try {
      const settingsData = await settingsFile.readData();

      if (holidayName) {
        ipcMainEvent.reply(
          CHANNELS.SEND_POP_UP_MESSAGE,
          "Отправка поздравления в телеграм...",
        );
        const holidayMessage = await getHolidayMessage({
          holidayName,
          appSettings: settingsData,
          shouldWriteAboutHolidayWithAI,
        });

        await telegramBot.sendMessageToGroups({
          message: holidayMessage,
          tgGroups: settingsData.telegram.telegramGroups,
          waitSeconds: settingsData.telegram.waitSeconds,
        });
      }
      ipcMainEvent.reply(
        CHANNELS.SEND_POP_UP_MESSAGE,
        "Отправка картинок в телеграм...",
      );
      await telegramBot.sendMediaRecordsToGroups({
        tgAdmin: settingsData.telegram.telegramAdmin,
        tgGroups: settingsData.telegram.telegramGroups,
        waitSeconds: settingsData.telegram.waitSeconds,
        mediaRecords: pictures,
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
    { id, url, title, urlPreview, sendAsFile }: TelegramBotSendVideoPayload,
  ) => {
    try {
      const settingsData = await settingsFile.readData();
      const cacheDir = settingsData.cacheDir;

      const botRunning = await telegramBot.checkIsRunning();
      if (!botRunning) {
        ipcMainEvent.reply(CHANNELS.SEND_POP_UP_ERROR, "Бот не запущен");
        return;
      }

      ipcMainEvent.reply(CHANNELS.TELEGRAM_BOT_SEND_FILE_STATUS, {
        id,
        status: SendFileStatus.SENDING,
      });

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
      ipcMainEvent.reply(CHANNELS.TELEGRAM_BOT_SEND_FILE_STATUS, {
        id,
        status: SendFileStatus.SENT,
      });
    } catch (error) {
      console.error("Error:", error);
      ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
        channel: CHANNELS.TELEGRAM_BOT_SEND_PICTURE,
        error,
      });
      ipcMainEvent.reply(CHANNELS.TELEGRAM_BOT_SEND_FILE_STATUS, {
        id,
        status: SendFileStatus.ERROR,
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
