import { app } from "electron";
import { readFile, writeFile } from "fs/promises";

import { type AppSettings } from "@shared/lib/types/app-settings";

import { createFileJSONIfNotExists } from "./createFileIfNotExists";

/**
 * Параметры для записи настроек.
 */
interface WriteSettingsProps {
  /**
   * Данные настроек, которые нужно сохранить.
   */
  settings: unknown;
  /**
   * Ключ, под которым будут сохранены настройки (например, 'stihiRu').
   */
  key: string;
}

/**
 * Записывает новые настройки в JSON-файл, объединяя их с существующими.
 *
 * @param key - Ключ, под которым сохраняются настройки (например, имя сервиса).
 * @param settings - Объект с данными настроек, которые нужно добавить или обновить.
 *
 * @remarks
 * Сначала читает текущие настройки из файла, потом добавляет или перезаписывает
 * секцию по указанному ключу. После чего сохраняет всё обратно в файл.
 * Возвращает обновлённый объект настроек — можно использовать дальше.
 *
 * @returns Объект с обновлёнными настройками.
 */
export const writeSettings = async ({ key, settings }: WriteSettingsProps) => {
  const settingsData = await readSettingsFile();
  const newSettings = { ...settingsData, [key]: settings };
  const fullFileNameSettings = getFileNameSettings();
  // Преобразуем объект в строку JSON с отступами для читаемости (2 пробела)
  const jsonContent = JSON.stringify(newSettings, null, 2);
  await writeFile(fullFileNameSettings, jsonContent, "utf-8");
  return newSettings;
};

/**
 * Читает настройки приложения
 * @returns настройки приложения
 */
export async function readSettingsFile() {
  const fullFileNameSettings = getFileNameSettings();
  await createFileJSONIfNotExists(fullFileNameSettings, {
    stihiRu: { login: "", password: "", cookies: [] },
  } as AppSettings);
  const data = await readFile(fullFileNameSettings, "utf-8");
  const settingsData = JSON.parse(data) as AppSettings;
  return settingsData;
}

/**
 * Возвращает полный путь к файлу настроек приложения.
 *
 * @returns {string} Полный путь к файлу настроек вида `{путь_к_данным_пользователя}/settings.json`.
 */
function getFileNameSettings() {
  const userDataPath = app.getPath("userData");
  const fullFileNameSettings = `${userDataPath}/settings.json`;
  return fullFileNameSettings;
}
