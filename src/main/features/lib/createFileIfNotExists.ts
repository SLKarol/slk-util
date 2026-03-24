import fs from "fs/promises";

/**
 * Создаёт JSON-файл, если он ещё не существует.
 *
 * @param filePath - Путь к файлу, который нужно создать.
 * @param defaultData - Данные по умолчанию, которые будут записаны в файл. Может быть любым значением, сериализуемым в JSON.
 *
 * @remarks
 * Сначала проверяет, существует ли файл. Если да — ничего не делает.
 * Если файла нет (ошибка ENOENT) — создаёт его и записывает туда `defaultData` в виде отформатированного JSON.
 * Если произошла какая-то другая ошибка (например, нет прав на запись) — пробрасывает её дальше.
 *
 * @throws Перебрасывает ошибку, если она не связана с отсутствием файла.
 */
export async function createFileJSONIfNotExists(
  filePath: string,
  defaultData?: unknown,
) {
  try {
    await fs.access(filePath, fs.constants.F_OK);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(
        filePath,
        JSON.stringify(defaultData, null, 2),
        "utf-8",
      );
    } else {
      throw error; // Перебрасываем другие ошибки
    }
  }
}
