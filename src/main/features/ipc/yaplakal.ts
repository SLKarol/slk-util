import { app, type IpcMainEvent } from "electron";
import { mkdir } from "fs/promises";
import { parse } from "node-html-parser";
import { join } from "path";

import { TMP_FOLDER } from "../lib/constants";
import { fetchHtml } from "../lib/fetch";

import { CHANNELS } from "@shared/ipc/channels";

/**
 * Обработчики IPC-запросов для работы с Yaplakal.
 */
export const yapHandlers = {
  [CHANNELS.FETCH_YA_PLAKAL_TOPIC]: async (
    ipcMainEvent: IpcMainEvent,
    url: string,
  ) => {
    const tmpFolder = join(app.getPath("temp"), TMP_FOLDER);
    await mkdir(tmpFolder, { recursive: true });
    try {
      const htmlText = await fetchHtml(url);
      const rootPage = parse(htmlText);
    } catch (error) {
      console.error("Error:", error);
      ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
        requestParam: CHANNELS.FETCH_YA_PLAKAL_TOPIC,
        error,
      });
    }

    console.log("url :>> ", url);
    console.log("tmpFolder :>> ", tmpFolder);
  },
};
