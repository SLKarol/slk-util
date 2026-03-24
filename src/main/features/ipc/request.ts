import { type IpcMainEvent } from "electron";

import { extractCookies } from "../handlers";
import { writeSettings } from "../lib/settings";

import { REQUEST_HEADERS } from "@main/shared/lib/constants";

import { CHANNELS } from "@shared/ipc/channels";
import { generateTruncatedUuid } from "@shared/lib/generateId";
import { RequestLoginForm } from "@shared/lib/types/request";

/**
 * Объект, содержащий обработчики IPC-запросов для выполнения HTTP-запросов.
 *
 * @remarks
 * Данный объект экспортирует асинхронные обработчики, зарегистрированные на определённые каналы IPC.
 * Обработчики выполняют сетевые запросы, обрабатывают ответы и отправляют результат обратно в renderer-процесс.
 * В случае ошибок — отправляют сообщение об ошибке через соответствующий канал.
 */
export const requestHandlers = {
  /**
   * Обрабатывает IPC-запрос на получение текстового содержимого по указанному URL (GET-запрос).
   *
   * @param event - Объект события IPC, используемый для отправки ответа обратно в renderer.
   * @param requestParam - URL-адрес, с которого необходимо получить данные.
   *
   * @remarks
   * Функция выполняет GET-запрос с предопределёнными заголовками. Автоматически определяет кодировку
   * ответа: сначала из заголовка `Content-Type`, при отсутствии — использует UTF-8 по умолчанию.
   * Декодирует бинарные данные с помощью `TextDecoder` и отправляет текстовый результат через канал `RECEIVE_TEXT`.
   *
   * @throws Отправляет сообщение об ошибке через канал `ERROR_MAIN` в случае неудачного запроса.
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
  /**
   * Обрабатывает IPC-запрос на отправку формы входа (POST-запрос) для авторизации на сервере.
   *
   * @param event - Объект события IPC, используемый для отправки ответа обратно в renderer.
   * @param data - Данные формы входа, включая URL, тело запроса, заголовки и имя формы.
   *
   * @remarks
   * Выполняет POST-запрос с указанными параметрами и специальными заголовками, включая `Idempotency-Key`
   * для предотвращения повторных отправок. Извлекает куки из ответа, сохраняет их вместе с логином
   * и паролем в настройки приложения через `writeSettings`, после чего отправляет успешный ответ.
   *
   * @throws Отправляет сообщение об ошибке через канал `ERROR_MAIN` в случае сетевой ошибки
   *         или если ответ от сервера не является успешным (не ok).
   */
  [CHANNELS.REQUEST_POST_LOGIN]: async (
    event: IpcMainEvent,
    data: RequestLoginForm,
  ) => {
    const { body, formName, headers, url } = data;
    try {
      const loginResponse = await fetch(url, {
        method: "POST",
        headers: {
          ...REQUEST_HEADERS,
          ...headers,
          "Sec-GPC": "1",
          Priority: "u=0, i",
          "Content-Type": "application/x-www-form-urlencoded",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Idempotency-Key": String(generateTruncatedUuid()),
        },
        body: new URLSearchParams(body),
        credentials: "include",
        window: null,
      });

      if (loginResponse.ok) {
        const cookies = extractCookies(loginResponse.headers);
        // Записать cookies и логин в файл
        const settingsData = await writeSettings({
          key: "stihiRu",
          settings: { cookies, login: body.login, password: body.password },
        });
        // Отправить ответ клиенту, что все ок
        event.reply(CHANNELS.RECEIVE_SETTINGS, settingsData);
      } else {
        event.reply(CHANNELS.ERROR_MAIN, "Ошибка авторизации");
      }
    } catch (error) {
      event.reply(CHANNELS.ERROR_MAIN, {
        formName,
        error,
      });
    }
  },
};
