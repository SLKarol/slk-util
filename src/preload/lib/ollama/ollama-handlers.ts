import { ipcRenderer, type IpcRendererEvent } from "electron";
import { type ModelResponse } from "ollama";

import { CHANNELS } from "@shared/ipc/channels";
import { type ElectronAPI } from "@shared/lib/types/electron-api";
import { type OllamaResponse } from "@shared/lib/types/ollama";

/**
 * Создаёт объект с обработчиками событий праздников.
 */
export const createOllamaHandlers = () =>
  ({
    fetchOllamaModelWithPrompt: (payload) =>
      ipcRenderer.send(CHANNELS.OLLAMA_ASK_MODEL, payload),

    responseOllamaModel: (callback: (data: OllamaResponse) => void) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as OllamaResponse);

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.OLLAMA_RESPONSE, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(CHANNELS.OLLAMA_RESPONSE, subscription);
      };
    },

    listInstalledOllamaModels: () =>
      ipcRenderer.send(CHANNELS.OLLAMA_RECEIVE_MODELS),

    processOllamaModelListResponse: (
      callback: (data: ModelResponse[]) => void,
    ) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as ModelResponse[]);

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.OLLAMA_RESPONSE_MODELS, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(
          CHANNELS.OLLAMA_RESPONSE_MODELS,
          subscription,
        );
      };
    },
  }) as ElectronAPI;
