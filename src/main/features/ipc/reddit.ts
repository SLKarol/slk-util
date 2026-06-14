import { type IpcMainEvent } from "electron";
import { mkdir } from "fs/promises";

import {
  decodeImageUrlTo64,
  downloadAndCacheFile,
  getDefaultSettings,
  getImagesCollection,
} from "../lib/helpers";
import { Reddit } from "../Reddit";
import { UserDataFileManager } from "../UserDataFileManager";

import { CHANNELS } from "@shared/ipc/channels";
import { type AppSettings } from "@shared/lib/types/app-settings";
import { type RedditReceiveNewRecordsPayload } from "@shared/lib/types/electron-api";

const settingsFile = new UserDataFileManager<AppSettings>(
  "settings.json",
  getDefaultSettings(),
);
/** Объект работы с reddit */
let reddit: Reddit;

settingsFile
  .readData()
  .then(
    ({
      reddit: { redditApiSecret, redditAppId, redditPassword, redditUserName },
    }) => {
      reddit = new Reddit({
        redditApiSecret,
        redditAppId,
        redditPassword,
        redditUserName,
      });
    },
  )
  .catch(() => console.log("Error read settings"));

export const redditHandlers = {
  [CHANNELS.REDDIT_RECEIVE_MY_REDDITS]: async (ipcMainEvent: IpcMainEvent) => {
    const mySubReddit = await reddit.mySubreddits();
    ipcMainEvent.reply(CHANNELS.REDDIT_RESPONSE_MY_REDDITS, mySubReddit);
  },
  [CHANNELS.REDDIT_RECEIVE_NEW_RECORDS]: async (
    ipcMainEvent: IpcMainEvent,
    { after, channel }: RedditReceiveNewRecordsPayload,
  ) => {
    const settingsData = await settingsFile.readData();

    let cacheDir = settingsData.cacheDir;
    if (!("cacheDir" in settingsData) || !cacheDir) {
      cacheDir = getDefaultSettings().cacheDir;
      (settingsData as AppSettings).cacheDir = cacheDir;
    }
    await mkdir(cacheDir, { recursive: true });

    const limit = settingsData.reddit.redditLimitRecords;
    const afterParam = after ? after : undefined;

    const mySubReddits = await reddit.getNewRecords({
      channel,
      after: afterParam,
      limit,
    });

    // Отправить новые записи клиенту
    ipcMainEvent.reply(CHANNELS.REDDIT_RESPONSE_NEW_RECORDS, {
      records: mySubReddits.data,
      after: mySubReddits.after,
      channel,
    });

    // Получить постеры к каждой записи
    const promises = mySubReddits.data.map(
      async ({ id, preview, collection, noMedia }) => {
        if (noMedia) return null;
        try {
          // Если запись из Reddit с альбомом:
          if (collection) {
            const loadedCollection = await getImagesCollection({
              collection,
              cacheDir,
            });
            return ipcMainEvent.reply(CHANNELS.REDDIT_RESPONSE_COLLECTION, {
              id,
              collection: loadedCollection,
            });
          }
          // Иначе, если обычная запись без альбома:
          if (preview && "images" in preview && preview.images.length) {
            const [firstImage] = preview.images;
            const {
              source: { height, url, width },
            } = firstImage;

            const filePath = await downloadAndCacheFile({
              url,
              cacheDir,
            });
            const fileDecode = (await decodeImageUrlTo64(filePath)) ?? null;
            if (fileDecode) {
              return ipcMainEvent.reply(CHANNELS.REDDIT_RESPONSE_PREVIEW, {
                id,
                preview: {
                  decoded: fileDecode,
                  url,
                  height,
                  width,
                },
              });
            }
          }
          return null;
        } catch (error) {
          console.error("Error:", error);
          ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
            requestParam: CHANNELS.REDDIT_RECEIVE_NEW_RECORDS,
            error,
          });
        }
      },
    );

    return await Promise.all(promises);
  },
};
