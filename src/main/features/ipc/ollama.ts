import { type IpcMainEvent } from "electron";
import { Ollama } from "ollama";

import { CHANNELS } from "@shared/ipc/channels";
import { type OllamaAskProps } from "@shared/lib/types/ollama";
import { UserDataFileManager } from "../UserDataFileManager";
import { type AppSettings } from "@shared/lib/types/app-settings";
import { getDefaultSettings } from "../lib/helpers";

/**
 * Обработчик запросов к ollama
 */
export const ollamaHandlers = {
  /**
   * Обработчик запроса на получение списка праздников на текущий день.
   */
  [CHANNELS.OLLAMA_ASK_MODEL]: async (
    ipcMainEvent: IpcMainEvent,
    { idPrompt, model, prompt }: OllamaAskProps,
  ) => {
    const settingsFile = new UserDataFileManager<AppSettings>(
      "settings.json",
      getDefaultSettings(),
    );
    const settingsData = await settingsFile.readData();
    const { ollama } = settingsData;

    try {
      const ollamaEntity = new Ollama({ host: ollama.host });

      ipcMainEvent.reply(CHANNELS.SEND_POP_UP_MESSAGE, "Генерация ответа...");
      const response = await ollamaEntity.generate({
        model,
        prompt,
        stream: false, // Для получения полного ответа сразу
      });

      ipcMainEvent.reply(CHANNELS.OLLAMA_RESPONSE, {
        idPrompt,
        response: response.response ?? "",
      });
      ipcMainEvent.reply(CHANNELS.SEND_POP_UP_MESSAGE, "Ответ передан.");
    } catch (error) {
      console.error("Error:", error);
      ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
        requestParam: CHANNELS.GET_BAN_AUTHORS,
        error,
      });
    }
  },
};
