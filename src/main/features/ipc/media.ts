import { app, type IpcMainEvent } from "electron";
import { access, copyFile } from "fs/promises";
import { basename, join } from "path";

import { TMP_FOLDER } from "../lib/constants";
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
    const cacheDir = join(app.getPath("temp"), TMP_FOLDER);

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
    } catch (error) {
      const { message } = error as Error;
      ipcMainEvent.reply(CHANNELS.SEND_POP_UP_ERROR, message ?? error);
    }
  },
};
