import { app } from "electron";
import { readFile } from "fs/promises";

import { createFileJSONIfNotExists } from "./createFileIfNotExists";

/**
 * Прочесть и вернуть список забаненных авторов.
 * @returns список забаненных авторов.
 */
export const readBanAuthors = async () => {
  const fullFileName = getFileNameBanAuthor();
  await createFileJSONIfNotExists(fullFileName, [] as string[]);
  const data = await readFile(fullFileName, "utf-8");
  const banAuthors = JSON.parse(data) as string[];
  return banAuthors;
};

/**
 * Вычисление имени файла с забаненными авторами.
 * @returns Полный путь к файлу с забаненными авторами.
 */
function getFileNameBanAuthor() {
  const userDataPath = app.getPath("userData");
  const fullFileNameSettings = `${userDataPath}/banAuthor.json`;
  return fullFileNameSettings;
}
