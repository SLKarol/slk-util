import { type IpcMainEvent, shell } from "electron";

import { BASE_URL_STIHI_RU } from "../lib/constants";

import { CHANNELS } from "@shared/ipc/channels";

export const stihiRuHandlers = {
  [CHANNELS.STIHI_OPEN_POEM]: (event: IpcMainEvent, hrefPoem: string) => {
    shell.openExternal(`${BASE_URL_STIHI_RU}${hrefPoem}`);
  },
  [CHANNELS.STIHI_OPEN_ALL_POEMS]: async (
    _: IpcMainEvent,
    hrefPoems: string[],
  ) => {
    for (const link of hrefPoems) {
      // await гарантирует, что следующий шаг цикла начнется
      // только после разрешения текущего промиса
      await shell.openExternal(`${BASE_URL_STIHI_RU}${link}`);
    }
  },
};
