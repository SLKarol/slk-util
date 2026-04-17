import { type IpcMainEvent } from "electron";

import { CHANNELS } from "@shared/ipc/channels";

/**
 * Обработчики IPC-запросов для работы с Yaplakal.
 */
export const yapHandlers = {
  [CHANNELS.FETCH_YA_PLAKAL_TOPIC]: (
    ipcMainEvent: IpcMainEvent,
    url: string,
  ) => {
    console.log("url :>> ", url);
  },
};
