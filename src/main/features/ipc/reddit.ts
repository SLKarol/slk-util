import { type IpcMainEvent } from "electron";

import { getDefaultSettings } from "../lib/helpers";
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
  },
};
