import dayjs from "dayjs";

/**
 * Генерирует URL для стихов по заданной дате.
 *
 * Функция принимает строку с датой, парсит её с помощью `dayjs`,
 * извлекает год, месяц и день, затем формирует URL,
 * ведущий на сайт "Стихи.ру" с фильтрацией по этой дате.
 *
 * @param {string} dateString - Строка с датой в формате, поддерживаемом `dayjs` (например, '2023-10-05').
 * @returns {string} Сформированный URL с параметрами года, месяца и дня.
 */
export const generateUrlForDate = (dateString: string) => {
  const dateJS = dayjs(dateString);
  return `https://stihi.ru/poems/list.html?topic=all&year=${dateJS.year()}&month=${dateJS.format("MM")}&day=${dateJS.format("D")}`;
};
