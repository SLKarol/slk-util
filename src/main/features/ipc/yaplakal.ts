import { app, type IpcMainEvent } from "electron";
import { mkdir, readFile } from "fs/promises";
import { parse } from "node-html-parser";
import { join } from "path";

import { TMP_FOLDER } from "../lib/constants";
import { decodeImageUrlTo64, downloadAndCacheFile } from "../lib/helpers";
import { getMediaFromTopic, getPageInfo } from "../lib/yaplakal";

import { CHANNELS } from "@shared/ipc/channels";

/**
 * Обработчики IPC-запросов для работы с Yaplakal.
 */
export const yapHandlers = {
  [CHANNELS.FETCH_YA_PLAKAL_TOPIC]: async (
    ipcMainEvent: IpcMainEvent,
    url: string,
  ) => {
    const cacheDir = join(app.getPath("temp"), TMP_FOLDER);

    try {
      const filePathHtml = await downloadAndCacheFile({
        url,
        cacheDir,
      });

      const htmlText = await readFile(filePathHtml, "utf8");
      const rootPage = parse(htmlText);

      const pages = getPageInfo(rootPage);
      const mediaInfo = await getMediaFromTopic(rootPage, url);
      ipcMainEvent.reply(CHANNELS.RECEIVE_YA_PLAKAL_TOPIC, {
        mediaInfo,
        pages,
      });

      const promisesDownload = mediaInfo.map(async (item) => {
        await mkdir(cacheDir, { recursive: true });

        let ulrMedia = item.url;
        let urlPreviewVideo = "";

        if (!ulrMedia) {
          ulrMedia = item.videoParts?.urlVideo;
          if (ulrMedia) {
            urlPreviewVideo = item.previewImages?.src ?? "";
          }
        }

        if (!ulrMedia) return false;

        const filePath = await downloadAndCacheFile({
          url: ulrMedia,
          cacheDir,
        });

        let previewFilePath: string | undefined;
        if (urlPreviewVideo) {
          previewFilePath = await downloadAndCacheFile({
            url: urlPreviewVideo,
            cacheDir,
          });
        }

        const filePathDecode = await decodeImageUrlTo64(filePath);
        const previewFilePathDecode = previewFilePath
          ? await decodeImageUrlTo64(previewFilePath)
          : null;

        ipcMainEvent.reply(CHANNELS.RECEIVE_YA_PLAKAL_TOPIC_MEDIA, {
          id: item.id,
          filePath: filePathDecode,
          previewFilePath: previewFilePathDecode,
        });

        return true;
      });

      await Promise.allSettled(promisesDownload);
    } catch (error) {
      console.error("Error:", error);
      ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
        requestParam: CHANNELS.FETCH_YA_PLAKAL_TOPIC,
        error,
      });
    }
  },
};
