/**
 * Функция для преобразования байтов в человекочитаемый формат.
 * @param bytes - Количество байтов.
 * @param decimals - Количество знаков после запятой (по умолчанию 2).
 * @returns Строка с человекочитаемым размером данных.
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
