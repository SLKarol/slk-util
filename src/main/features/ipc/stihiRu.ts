import { type IpcMainEvent } from "electron";

import { BASE_URL_STIHI_RU } from "../lib/constants";
import { readSettingsFile } from "../lib/settings";

import { REQUEST_HEADERS } from "@main/shared/lib/constants";

import { CHANNELS } from "@shared/ipc/channels";
import { type IObjectStringValue } from "@shared/lib/types/common";
import { type RequestPoem } from "@shared/lib/types/request";

export const stihiRuHandlers = {
  /**
   * Обработчик канала `CHANNELS.STIHI_REQUEST_POEM`.
   * Выполняет GET-запрос к указанному URL стихотворения на stihi.ru с учётом куки и Referer.
   *
   * @param event - Объект события IPC, используется для отправки ответа обратно в рендер-процесс.
   * @param params - Параметры запроса, содержащие:
   *   - `hrefPoem` — путь к стихотворению (например, `/poems/12345`).
   *   - `referer` — реферер для заголовка запроса.
   *
   * @returns Отправляет результат через `event.reply`:
   *   - В случае успеха: канал `CHANNELS.STIHI_RECEIVE_POEM` с текстом HTML-страницы.
   *   - В случае ошибки: канал `CHANNELS.ERROR_MAIN` с описанием ошибки.
   */
  [CHANNELS.STIHI_REQUEST_POEM]: async (
    event: IpcMainEvent,
    { hrefPoem, referer }: RequestPoem,
  ) => {
    const settingsApp = await readSettingsFile();
    const headers = { ...REQUEST_HEADERS };
    headers["Referer"] = `${BASE_URL_STIHI_RU}${referer}`;
    // Добавляем куки, если они есть в настройках
    if (settingsApp.stihiRu.cookies.length > 0)
      headers["Cookie"] = formatCookieHeader(settingsApp.stihiRu.cookies[0]);

    try {
      const response = await fetch(`${BASE_URL_STIHI_RU}${hrefPoem}`, {
        method: "GET",
        headers,
        credentials: "include",
        window: null,
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
      event.reply(CHANNELS.STIHI_RECEIVE_POEM, {
        hrefPoem,
        textContent: htmlText,
      });
    } catch (error) {
      event.reply(CHANNELS.ERROR_MAIN, {
        hrefPoem,
        error,
      });
    }
  },
};

/**
 * Преобразует строку с куками в корректный заголовок Cookie, фильтруя и добавляя необходимые значения.
 *
 * @param cookieString - Исходная строка с куками (например, `"login=abc123; pcode=xyz789"`).
 *
 * @returns Отформатированная строка заголовка Cookie, содержащая только разрешённые куки:
 *   - `login`
 *   - `pcode`
 *   - `cookies_policy` (добавляется принудительно)
 *
 * @remarks
 * На сайте stihi.ru требуется наличие `cookies_policy=true`, иначе доступ может быть ограничен.
 * Также удаляются лишние пробелы и некорректные пары.
 */
function formatCookieHeader(cookieString: string) {
  // Разбиваем строку на отдельные пары «имя=значение» по точке с запятой
  const cookiePairs = cookieString.split(";");

  // Объект для хранения уникальных куки (ключ — имя куки, значение — значение куки)
  const cookies = [] as IObjectStringValue[];

  cookiePairs.forEach((pair) => {
    // Убираем пробелы в начале и конце
    const trimmedPair = pair.trim().replace(", ", "");

    // Пропускаем пустые элементы
    if (!trimmedPair) return;

    // Разделяем имя и значение по первому знаку «=»
    const separatorIndex = trimmedPair.indexOf("=");
    if (separatorIndex === -1) return; // Пропускаем, если нет знака «=»

    const name = trimmedPair.substring(0, separatorIndex).trim();
    const value = trimmedPair.substring(separatorIndex + 1).trim();

    cookies.push({ [name]: value });
  });

  cookies.push({ cookies_policy: true } as unknown as IObjectStringValue);
  return (
    cookies
      // Какая-то непонятная логика у них, на stihi.ru
      .filter((cookie) => {
        const arr = Object.keys(cookie).at(0);
        return ["login", "pcode", "cookies_policy"].includes(arr);
      })
      .map((cookie) => Object.entries(cookie).at(0).join("="))
      .join("; ")
  );
}
