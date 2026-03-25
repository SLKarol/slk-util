import { ipcMain } from "electron";

import { banAuthorHandlers } from "@main/features/ipc/banAutor";
import { requestHandlers } from "@main/features/ipc/request";
import { settingsHandlers } from "@main/features/ipc/settings";

/**
 * Регистрация обработчиков ipc.
 */
export function registerHandlers() {
  // Записать в electronAPI обработчики запросов
  Object.entries(requestHandlers).forEach(([channel, handler]) => {
    ipcMain.on(channel, handler);
  });

  // Записать в electronAPI обработчики настроек
  Object.entries(settingsHandlers).forEach(([channel, handler]) => {
    ipcMain.on(channel, handler);
  });

  // Записать в electronAPI обработчики плохих авторов
  Object.entries(banAuthorHandlers).forEach(([channel, handler]) => {
    ipcMain.on(channel, handler);
  });
}

/**
 * Извлекает cookies из HTTP-заголовков ответа.
 *
 * Функция проверяет наличие заголовка `set-cookie` в переданных заголовках,
 * извлекает его значения и возвращает массив строк, представляющих отдельные cookie.
 * Поддерживает как одиночное значение, так и несколько значений (в виде массива).
 *
 * @param {Headers} headers - Объект заголовков, полученный от HTTP-ответа (например, из Fetch API).
 * @returns {string[]} Массив строк, каждая из которых представляет одну cookie в формате строки.
 *                   Возвращает пустой массив, если заголовок `set-cookie` отсутствует.
 */
export function extractCookies(headers: Headers) {
  const cookies: (string & unknown[]) | string[] = [];
  const setCookie = headers.get("set-cookie");

  if (setCookie) {
    // Разбираем все cookies из заголовка
    const newCookies = Array.isArray(setCookie) ? setCookie : [setCookie];
    cookies.push(...newCookies);
  }
  return cookies;
}
