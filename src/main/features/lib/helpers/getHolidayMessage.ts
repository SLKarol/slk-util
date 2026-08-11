import { Ollama } from "ollama";

import { HOLIDAY_NAME_PATTERN } from "@shared/lib/constants";
import { type AppSettings } from "@shared/lib/types/app-settings";

/**
 * Интерфейс для входных данных функции getHolidayMessage.
 */
interface GetHolidayMessagePayload {
  /**
   * Название праздника.
   */
  holidayName: string;

  /**
   * Настройки приложения.
   */
  appSettings: AppSettings;

  /**
   * Флаг, указывающий, нужно ли генерировать сообщение о празднике с использованием AI.
   */
  shouldWriteAboutHolidayWithAI: boolean;
}

/**
 * Функция для получения сообщения о празднике.
 * @param payload - Объект с входными данными.
 * @returns Сообщение о празднике.
 */
export const getHolidayMessage = async ({
  appSettings: { ollama, templateHoliday, templatesPrompts },
  holidayName,
  shouldWriteAboutHolidayWithAI,
}: GetHolidayMessagePayload) => {
  if (!shouldWriteAboutHolidayWithAI) {
    return templateHoliday
      ? templateHoliday.replace(HOLIDAY_NAME_PATTERN, holidayName)
      : holidayName;
  }
  if (ollama.host && ollama.model.holiday && templatesPrompts.holiday) {
    const ollamaEntity = new Ollama({ host: ollama.host });

    const response = await ollamaEntity.generate({
      model: ollama.model.holiday,
      prompt: templatesPrompts.holiday.replace(
        HOLIDAY_NAME_PATTERN,
        holidayName,
      ),
      stream: false, // Для получения полного ответа сразу
    });
    return response.response;
  }

  return holidayName;
};
