import { type StringValueWithKey } from "./types";

/**
 * Функция-маппер, которая извлекает и обрезает строковое значение из объекта с ключом.
 *
 * Удаляет лишние пробелы в начале и конце строки.
 *
 * @param {StringValueWithKey} param - Объект, содержащий строковое значение и ключ.
 * @param {string} param.value - Строковое значение для обработки.
 * @returns {string} Обрезанная строка.
 */
export const mapObjectValue = ({ value }: StringValueWithKey) => value.trim();

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i]
  );
}
