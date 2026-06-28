import { type IpcMainEvent } from "electron";

import { getHolydaysToday } from "../lib/helpers";

import { CHANNELS } from "@shared/ipc/channels";

export const holidaysHandlers = {
  /**
   * Обработчик запроса на получение списка праздников на текущий день.
   */
  [CHANNELS.RECEIVE_NAMES_OF_HOLIDAYS]: async (ipcMainEvent: IpcMainEvent) => {
    try {
      const holydaysToday = await getHolydaysToday();
      ipcMainEvent.reply(CHANNELS.RESPONSE_NAMES_OF_HOLIDAYS, holydaysToday);
    } catch (error) {
      console.error("Error:", error);
      ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
        requestParam: CHANNELS.GET_BAN_AUTHORS,
        error,
      });
    }
  },
};
