import { type IpcMainEvent } from "electron";
import { Ollama } from "ollama";

import { CHANNELS } from "@shared/ipc/channels";
import { type OllamaAskProps } from "@shared/lib/types/ollama";
import { UserDataFileManager } from "../UserDataFileManager";
import { type AppSettings } from "@shared/lib/types/app-settings";
import { getDefaultSettings } from "../lib/helpers";

export const initOllamaHandlers = async () => {
  /** Менеджер файла для работы с настройками приложения.  */
  const settingsFile = new UserDataFileManager<AppSettings>(
    "settings.json",
    getDefaultSettings(),
  );
  const settingsData = await settingsFile.readData();
  const ollamaEntity = new Ollama({ host: settingsData.ollama.host });

  return {
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

      try {
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

    [CHANNELS.OLLAMA_RECEIVE_MODELS]: async (ipcMainEvent: IpcMainEvent) => {
      try {
        const listModels = await ollamaEntity.list();
        ipcMainEvent.reply(CHANNELS.OLLAMA_RESPONSE_MODELS, listModels.models);
      } catch (error) {
        console.error("Error:", error);
        ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
          requestParam: CHANNELS.GET_BAN_AUTHORS,
          error,
        });
      }
    },
  };
};
