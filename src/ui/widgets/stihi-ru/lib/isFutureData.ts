import dayjs from "dayjs";

/**
 * Проверяет, является ли переданная дата будущей по отношению к текущему дню.
 */
export const isFutureDate = (dateString: string) => {
  const targetDate = dayjs(dateString);
  const today = dayjs().startOf("day"); // Обнуляем время — сравниваем только даты

  return targetDate.isAfter(today);
};
