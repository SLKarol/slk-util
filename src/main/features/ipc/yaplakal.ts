import { type IpcMainEvent } from "electron";
import { mkdir, readFile } from "fs/promises";
import { parse } from "node-html-parser";

import {
  decodeImageUrlTo64,
  downloadAndCacheFile,
  getDefaultSettings,
} from "../lib/helpers";
import { getMediaFromTopic, getPageInfo } from "../lib/yaplakal";
import { UserDataFileManager } from "../UserDataFileManager";

import { CHANNELS } from "@shared/ipc/channels";
import { type AppSettings } from "@shared/lib/types/app-settings";

/**
 * Обработчики IPC-запросов для работы с Yaplakal.
 */
export const yapHandlers = {
  [CHANNELS.FETCH_YA_PLAKAL_TOPIC]: async (
    ipcMainEvent: IpcMainEvent,
    url: string,
  ) => {
    const settingsFile = new UserDataFileManager<AppSettings>(
      "settings.json",
      getDefaultSettings(),
    );
    const settingsData = await settingsFile.readData();

    let cacheDir = settingsData.cacheDir;
    if (!("cacheDir" in settingsData) || !cacheDir) {
      cacheDir = getDefaultSettings().cacheDir;
      (settingsData as AppSettings).cacheDir = cacheDir;
    }
    if (!("selectorMediaYap" in settingsData)) {
      (settingsData as AppSettings).selectorMediaYap =
        getDefaultSettings().selectorMediaYap;
    }
    await settingsFile.writeData(settingsData);

    try {
      const filePathHtml = await downloadAndCacheFile({
        url,
        cacheDir,
      });

      const htmlText = await readFile(filePathHtml, "utf8");
      const rootPage = parse(htmlText);

      const pages = getPageInfo(rootPage);
      const mediaInfo = await getMediaFromTopic({
        rootPage,
        urlTopic: url,
        cssSelectorMedia: settingsData.selectorMediaYap,
      });
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

        let previewFilePath: string | null = null;
        if (urlPreviewVideo) {
          previewFilePath = await downloadAndCacheFile({
            url: urlPreviewVideo,
            cacheDir,
          });
        }

        const fileDecode = (await decodeImageUrlTo64(filePath)) ?? null;
        const previewDecode = previewFilePath
          ? ((await decodeImageUrlTo64(previewFilePath)) ?? null)
          : null;

        ipcMainEvent.reply(CHANNELS.RECEIVE_YA_PLAKAL_TOPIC_MEDIA, {
          id: item.id ?? item.videoParts?.urlVideo,
          fileDecode,
          previewDecode,
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
