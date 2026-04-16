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
