import { app, dialog, type IpcMainEvent } from "electron";

import {
  emptyDirectory,
  getDefaultSettings,
  getDirectorySize,
} from "../lib/helpers";
import { UserDataFileManager } from "../UserDataFileManager";

import { CHANNELS } from "@shared/ipc/channels";
import { type AppSettings } from "@shared/lib/types/app-settings";
import { type WriteSettingsProps } from "@shared/lib/types/settings.type";

const settingsFile = new UserDataFileManager<AppSettings>(
  "settings.json",
  getDefaultSettings(),
);

/**
 * Объект, содержащий обработчики IPC-запросов для работы с настройками приложения.
 *
 * @remarks
 * Данный объект предоставляет методы для чтения настроек приложения по запросу из renderer-процесса.
 * Все операции асинхронные и используют механизм IPC для обмена данными между процессами.
 * При возникновении ошибок отправляется соответствующее сообщение через канал `ERROR_MAIN`.
 */
export const settingsHandlers = {
  /**
   * Обрабатывает IPC-запрос на получение текущих настроек приложения.
   *
   * @param event - Объект события IPC, используемый для отправки ответа обратно в renderer.
   * @param requestParam - Строка-идентификатор запроса (не используется напрямую, но передаётся в ошибку).
   *
   * @throws Отправляет сообщение об ошибке через канал `ERROR_MAIN` в случае неудачного чтения файла.
   */
  [CHANNELS.GET_SETTINGS]: async (
    ipcMainEvent: IpcMainEvent,
    requestParam: string,
  ) => {
    try {
      const settingsData = await settingsFile.readData();

      if (!("folderForSaveFiles" in settingsData)) {
        (settingsData as AppSettings).folderForSaveFiles =
          app.getPath("downloads");
      }

      const cacheDir = settingsData.cacheDir;
      if (!("cacheDir" in settingsData) || !cacheDir) {
        (settingsData as AppSettings).cacheDir = getDefaultSettings().cacheDir;
      }
      if (!("selectorMediaYap" in settingsData)) {
        (settingsData as AppSettings).selectorMediaYap =
          getDefaultSettings().selectorMediaYap;
      }

      await settingsFile.writeData(settingsData);
      ipcMainEvent.reply(CHANNELS.RECEIVE_SETTINGS, settingsData);
    } catch (error) {
      console.error("Error:", error);
      ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
        requestParam,
        error,
      });
    }
  },

  [CHANNELS.SAVE_SETTING]: async (
    ipcMainEvent: IpcMainEvent,
    { key, settings }: WriteSettingsProps,
  ) => {
    try {
      const settingsData = await settingsFile.readData();
      const newSettings = { ...settingsData, [key]: settings };
      await settingsFile.writeData(newSettings);
      ipcMainEvent.reply(CHANNELS.SEND_POP_UP_MESSAGE, "Сохранено");
    } catch (error) {
      console.error("Error:", error);
      ipcMainEvent.reply(CHANNELS.SEND_POP_UP_ERROR, "Ошибка при сохранении");
    }
  },

  [CHANNELS.CHANGE_SAVE_VIDEO_DIRECTORY]: async (
    ipcMainEvent: IpcMainEvent,
  ) => {
    const settingsData = await settingsFile.readData();
    const { folderForSaveFiles } = settingsData;
    const dialogRes = await dialog.showOpenDialog({
      defaultPath: folderForSaveFiles,
      properties: ["openDirectory", "dontAddToRecent"],
    });
    if (dialogRes.canceled) return;
    const newSettingsData = {
      ...settingsData,
      folderForSaveFiles: dialogRes.filePaths[0],
    };
    settingsFile.writeData(newSettingsData);
    ipcMainEvent.reply(CHANNELS.SEND_POP_UP_MESSAGE, "Сохранено");
    ipcMainEvent.reply(CHANNELS.RECEIVE_SETTINGS, newSettingsData);
  },

  [CHANNELS.CHANGE_CACHE_FOLDER]: async (ipcMainEvent: IpcMainEvent) => {
    const settingsData = await settingsFile.readData();
    let { cacheDir = "" } = settingsData;
    if (!cacheDir) {
      cacheDir = getDefaultSettings().cacheDir;
    }

    const dialogRes = await dialog.showOpenDialog({
      defaultPath: cacheDir,
      properties: ["openDirectory", "dontAddToRecent"],
    });

    if (dialogRes.canceled) return;

    const newSettingsData = {
      ...settingsData,
      cacheDir: dialogRes.filePaths[0],
    };
    settingsFile.writeData(newSettingsData);
    ipcMainEvent.reply(CHANNELS.SEND_POP_UP_MESSAGE, "Каталог изменён.");
    ipcMainEvent.reply(CHANNELS.RECEIVE_SETTINGS, newSettingsData);

    const bytes = await getDirectorySize(dialogRes.filePaths[0]);
    ipcMainEvent.reply(CHANNELS.RECEIVE_CACHE_FOLDER_SIZE, bytes);
  },

  [CHANNELS.REQUEST_CACHE_FOLDER_SIZE]: async (ipcMainEvent: IpcMainEvent) => {
    const settingsData = await settingsFile.readData();

    let cacheDir = settingsData.cacheDir;
    if (!("cacheDir" in settingsData) || !cacheDir) {
      cacheDir = getDefaultSettings().cacheDir;
      (settingsData as AppSettings).cacheDir = cacheDir;
      await settingsFile.writeData(settingsData);
    }

    const bytes = await getDirectorySize(cacheDir);
    ipcMainEvent.reply(CHANNELS.RECEIVE_CACHE_FOLDER_SIZE, bytes);
  },

  [CHANNELS.CLEAR_CACHE_FOLDER]: async (ipcMainEvent: IpcMainEvent) => {
    const settingsData = await settingsFile.readData();

    let cacheDir = settingsData.cacheDir;
    if (!("cacheDir" in settingsData) || !cacheDir) {
      cacheDir = getDefaultSettings().cacheDir;
      (settingsData as AppSettings).cacheDir = cacheDir;
      await settingsFile.writeData(settingsData);
    }

    try {
      await emptyDirectory(cacheDir);
      ipcMainEvent.reply(CHANNELS.SEND_POP_UP_MESSAGE, "Кэш очищен");
      ipcMainEvent.reply(CHANNELS.RECEIVE_CACHE_FOLDER_SIZE, 0);
    } catch (error) {
      ipcMainEvent.reply(CHANNELS.SEND_POP_UP_ERROR, "Ошибка при очистке кэша");
    }
  },
};
