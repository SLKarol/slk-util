import { type SihiPoem } from "@shared/lib/types/stihiru.types";
import { parseDate } from "@renderer-shared/lib/dateTime";

/**
 * Сравнивает два стихотворения по дате в порядке убывания (от новых к старым).
 *
 * Используется для сортировки массива объектов `SihiPoem` по полю `dateTime`.
 * Преобразует строки дат в миллисекунды и возвращает разницу так,
 * чтобы более новые записи шли первыми.
 *
 * @param {SihiPoem} a - Первое стихотворение для сравнения.
 * @param {SihiPoem} b - Второе стихотворение для сравнения.
 * @returns {number} Положительное число, если `b` новее `a`, отрицательное — если старше, 0 — если даты равны.
 *
 * @example
 * poems.sort(sortPoemsDescData); // Отсортирует стихотворения от самых новых к самым старым
 */
export function sortPoemsDescData(a: SihiPoem, b: SihiPoem) {
  const dateA = a.dateTime ? parseDate(a.dateTime).getTime() : 0;
  const dateB = b.dateTime ? parseDate(b.dateTime).getTime() : 0;
  return dateB - dateA;
}
