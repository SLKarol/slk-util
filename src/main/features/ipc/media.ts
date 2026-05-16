import { type IpcMainEvent, shell } from "electron";
import { access, copyFile } from "fs/promises";
import { basename, join } from "path";

import { getCacheFileName, getDefaultSettings } from "../lib/helpers";
import { UserDataFileManager } from "../UserDataFileManager";

import { CHANNELS } from "@shared/ipc/channels";
import { type AppSettings } from "@shared/lib/types/app-settings";
import { type SaveMediaFilePayload } from "@shared/lib/types/electron-api";

export const mediaHandlers = {
  [CHANNELS.SAVE_MEDIA_FILE]: async (
    ipcMainEvent: IpcMainEvent,
    payload: SaveMediaFilePayload,
  ) => {
    const settingsFile = new UserDataFileManager<AppSettings>(
      "settings.json",
      getDefaultSettings(),
    );
    const settingsData = await settingsFile.readData();
    const savedFileName = await getCacheFileName(payload.url);
    let cacheDir = settingsData.cacheDir;
    if (!("cacheDir" in settingsData) || !cacheDir) {
      cacheDir = getDefaultSettings().cacheDir;
      (settingsData as AppSettings).cacheDir = cacheDir;
      await settingsFile.writeData(settingsData);
    }

    const url = new URL(payload.url);
    const fileName = basename(url.pathname);

    if (!savedFileName) {
      ipcMainEvent.reply(
        CHANNELS.SEND_POP_UP_ERROR,
        "Файл не найден в кэше. Возможно, он был удалён или перемещён.",
      );
      return;
    }

    const sourceFilePath = join(cacheDir, savedFileName);
    try {
      await access(sourceFilePath); // проверяем, существует ли исходный файл
      await copyFile(
        sourceFilePath,
        join(settingsData.folderForSaveFiles, fileName),
      );

      // Send success notification using the proper IPC channel
      ipcMainEvent.reply(
        CHANNELS.SEND_POP_UP_MESSAGE,
        `Файл ${fileName} успешно сохранён в ${settingsData.folderForSaveFiles}`,
      );
    } catch (error) {
      const { message } = error as Error;
      ipcMainEvent.reply(CHANNELS.SEND_POP_UP_ERROR, message ?? error);
    }
  },

  [CHANNELS.OPEN_URL_IN_BROWSER]: async (
    ipcMainEvent: IpcMainEvent,
    url: string,
  ) => {
    shell.openExternal(url);
  },
};
