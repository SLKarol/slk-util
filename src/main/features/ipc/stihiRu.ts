import { app, type IpcMainEvent, shell } from "electron";

import { BASE_URL_STIHI_RU } from "../lib/constants";

import { CHANNELS } from "@shared/ipc/channels";

export const stihiRuHandlers = {
  [CHANNELS.STIHI_OPEN_POEM]: (event: IpcMainEvent, hrefPoem: string) => {
    shell.openExternal(`${BASE_URL_STIHI_RU}${hrefPoem}`);
    app.focus();
  },
};
