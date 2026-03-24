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
   * Ответ на запрос авторизации
   */
  REQUEST_POST_LOGIN: "REQUEST_POST_LOGIN",

  /**
   * Ошибка главного процесса
   */
  ERROR_MAIN: "ERROR_MAIN",

  /**
   * Запрос на получение настроек
   */
  GET_SETTINGS: "GET_SETTINGS",
  /**
   * Получение настроек
   */
  RECEIVE_SETTINGS: "RECEIVE_SETTINGS",
} as const;
