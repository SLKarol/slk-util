/**
 * Преобразует строку с датой и временем в объект Date.
 *
 * Ожидается, что входная строка имеет формат "ДД.ММ.ГГГГ ЧЧ:ММ".
 * Функция разбивает строку на части, переставляет компоненты даты в формат ISO (ГГГГ-ММ-ДД),
 * добавляет секунды (по умолчанию 00) и создаёт объект Date.
 *
 * @param {string} dateString - Строка с датой и временем в формате "ДД.ММ.ГГГГ ЧЧ:ММ".
 * @returns {Date} Объект даты, соответствующий переданной строке.
 *
 * @example
 * parseDate("25.12.2023 14:30"); // Возвращает объект Date для 25 декабря 2023, 14:30:00
 */
export function parseDate(dateString: string) {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split(".");
  return new Date(`${year}-${month}-${day}T${timePart}:00`);
}
