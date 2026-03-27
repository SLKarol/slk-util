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

  /**
   * Запрос на получение настроек
   */
  GET_SETTINGS: "GET_SETTINGS",
  /**
   * Получение настроек
   */
  RECEIVE_SETTINGS: "RECEIVE_SETTINGS",

  /**
   * Запрос на получение забаненных авторов
   */
  GET_BAN_AUTHORS: "GET_BAN_AUTHORS",
  /**
   * Получение забаненных авторов
   */
  RECEIVE_BAN_AUTHORS: "RECEIVE_BAN_AUTHORS",

  /**
   * Открыть в броузере стих
   */
  STIHI_OPEN_POEM: "STIHI_OPEN_POEM",

  /**
   * Открыть в броузере все найденные стихи
   */
  STIHI_OPEN_ALL_POEMS: "STIHI_OPEN_ALL_POEMS",
} as const;
