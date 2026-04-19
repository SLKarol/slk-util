import { stat } from "fs/promises";

export async function getFileSize(filePath: string) {
  try {
    const stats = await stat(filePath);
    // Проверяем, что это файл, а не директория (опционально)
    if (stats.isFile()) {
      return stats.size;
    } else {
      // Например, возвращаем null или 0 для директории
      return null;
    }
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      // Файл не существует
      return null;
    }
    // Пробрасываем другие ошибки (недостаточно прав и т.п.)
    throw err;
  }
}
