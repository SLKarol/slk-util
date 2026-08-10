/**
 * Параметры для отправки выбранного праздника в Telegram.
 */
export interface SendSelectedToTelegramParams {
  /**
   * Флаг, указывающий, следует ли отправлять название праздника.
   */
  sendHolidayName: boolean;

  /**
   * Выбранный праздник.
   */
  selectedHoliday: string;
}
