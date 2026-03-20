/**
 * Определение каналов IPC
 */
export const CHANNELS = {
  /**
   * Переход на страницу
   */
  NAVIGATE: "NAVIGATE",
  /**
   * Запрос текста (Это может быть веб-страница)
   **/
  REQUEST_TEXT: "REQUEST_TEXT",
  /**
   * Получение текста
   **/
  RECEIVE_TEXT: "RECEIVE_TEXT",
  /**
   * Ошибка главного процесса
   */
  ERROR_MAIN: "ERROR_MAIN",
} as const;
