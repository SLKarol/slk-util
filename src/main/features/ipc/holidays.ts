import { type IpcMainEvent } from "electron";

import { getHolydaysToday } from "../lib/helpers";

import { CHANNELS } from "@shared/ipc/channels";

export const holidaysHandlers = {
  /**
   * Обработчик запроса на получение списка заблокированных авторов.
   */
  [CHANNELS.GET_BAN_AUTHORS]: async (ipcMainEvent: IpcMainEvent) => {
    try {
      const bannedAuthors = await getHolydaysToday();
      ipcMainEvent.reply(CHANNELS.RECEIVE_BAN_AUTHORS, bannedAuthors);
    } catch (error) {
      console.error("Error:", error);
      ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
        requestParam: CHANNELS.GET_BAN_AUTHORS,
        error,
      });
    }
  },
};
