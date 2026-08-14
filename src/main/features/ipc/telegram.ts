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

/**
 * Инициализирует обработчики для IPC-сообщений связанных с Telegram ботом.
 */
export const initTelegramHandlers = async () => {
  /** Менеджер файла для работы с настройками приложения.  */
  const settingsFile = new UserDataFileManager<AppSettings>(
    "settings.json",
    getDefaultSettings(),
  );

  /** Экземпляр Telegram бота. */
  let telegramBot: TelegramBot;

  // Чтение настроек из файла
  const settingsData = await settingsFile.readData();
  if (settingsData.telegram.telegramToken) {
    telegramBot = new TelegramBot(settingsData.telegram.telegramToken);
  }

  return {
    /**
     * Обработчик для отправки картинки в группы через Telegram.
     * @param {IpcMainEvent} ipcMainEvent - Событие IPC главного процесса.
     * @param {TelegramBotSendPicturePayload} payload - Данные для отправки картинки.
     */
    [CHANNELS.TELEGRAM_BOT_SEND_PICTURE]: async (
      ipcMainEvent: IpcMainEvent,
      { id, url, title }: TelegramBotSendPicturePayload,
    ) => {
      try {
        const settingsData = await settingsFile.readData();
        if (!telegramBot) {
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

    /**
     * Обработчик для отправки сообщения в группы через Telegram.
     * @param {IpcMainEvent} ipcMainEvent - Событие IPC главного процесса.
     * @param {TelegramBotSendGroupPayload} payload - Данные для отправки сообщения.
     */
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

    /**
     * Обработчик для отправки видео в группы через Telegram.
     * @param {IpcMainEvent} ipcMainEvent - Событие IPC главного процесса.
     * @param {TelegramBotSendVideoPayload} payload - Данные для отправки видео.
     */
    [CHANNELS.TELEGRAM_BOT_SEND_VIDEO]: async (
      ipcMainEvent: IpcMainEvent,
      { id, url, title, urlPreview, sendAsFile }: TelegramBotSendVideoPayload,
    ) => {
      try {
        const settingsData = await settingsFile.readData();
        const cacheDir = settingsData.cacheDir;

        if (!telegramBot) {
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

    /**
     * Обработчик для изменения токена Telegram бота.
     * @param {IpcMainEvent} ipcMainEvent - Событие IPC главного процесса.
     * @param {string} token - Новый токен бота.
     */
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
};
