import { type IpcMainEvent } from "electron";

import { REQUEST_HEADERS } from "@main/shared/lib/constants";

import { CHANNELS } from "@shared/ipc/channels";

/**
 * Обработчики запросов.
 */
export const requestHandlers = {
  /**
   * Обработка GET запроса.
   * @param event Ipc событие
   * @param requestParam Параметры запроса
   */
  [CHANNELS.REQUEST_TEXT]: async (
    event: IpcMainEvent,
    requestParam: string,
  ) => {
    try {
      const response = await fetch(requestParam, {
        method: "GET",
        headers: REQUEST_HEADERS,
      });
      // Получаем сырые данные
      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Определяем кодировку (сначала пробуем из заголовка, затем автоопределение)
      let charset = "utf-8";
      const contentType = response.headers.get("content-type") || "";
      const charsetMatch = contentType.match(/charset=([^;,\s"]+)/i);
      if (charsetMatch) {
        charset = charsetMatch[1].toLowerCase();
      }

      // Декодируем с правильной кодировкой
      const decoder = new TextDecoder(charset);
      const htmlText = decoder.decode(uint8Array);

      // Устанавливаем корректные заголовки для клиента
      event.reply(CHANNELS.RECEIVE_TEXT, {
        requestParam,
        textContent: htmlText,
      });
    } catch (error) {
      event.reply(CHANNELS.ERROR_MAIN, {
        requestParam,
        error,
      });
    }
  },
};
