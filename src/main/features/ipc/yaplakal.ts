import { app, type IpcMainEvent } from "electron";
import { mkdir } from "fs/promises";
import { parse } from "node-html-parser";
import { join } from "path";

import { TMP_FOLDER } from "../lib/constants";
import { fetchHtml, getFileSize } from "../lib/helpers";
import { downloadFileToCacheDir } from "../lib/helpers/downloadFileToCacheDir";
import { getCacheFileName } from "../lib/helpers/getCacheFileName";
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
      const htmlText = await fetchHtml(url);
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

        ipcMainEvent.reply(CHANNELS.RECEIVE_YA_PLAKAL_TOPIC_MEDIA, {
          id: item.id,
          filePath,
          previewFilePath,
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

interface DownloadAndCacheFileParams {
  /**
   * URL файла для скачивания
   */
  url: string;
  /**
   * Директория для кэширования скачанных файлов
   */
  cacheDir: string;
}

/**
 * Скачивает и кэширует файл по URL в указанную директорию.
 * Возвращает полный путь к файлу.
 */
async function downloadAndCacheFile({
  cacheDir,
  url,
}: DownloadAndCacheFileParams): Promise<string> {
  const fileName = getCacheFileName(url);
  const fullFileName = join(cacheDir, fileName);
  const sizeFile = await getFileSize(fullFileName);

  if (!sizeFile) {
    await downloadFileToCacheDir({
      fileUrl: url,
      fullFileName,
    });
  }

  return fullFileName;
}
