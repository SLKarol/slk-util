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

  /**
   * Добавить автора в список забаненных
   */
  ADD_BAN_AUTHOR: "ADD_BAN_AUTHOR",
  /**
   * Удалить автора из списка забаненных
   */
  REMOVE_BAN_AUTHOR: "REMOVE_BAN_AUTHOR",

  /**
   * Открыть страницу автора в броузере
   */
  STIHI_OPEN_AUTHOR: "STIHI_OPEN_AUTHOR",

  /**
   * Проверка, что запущен указанный броузер
   */
  CHECK_BROWSER_PROGRAM_RUN: "CHECK_BROWSER_PROGRAM_RUN",

  /**
   * Отправка сообщения об ошибке в виде pop-up
   */
  SEND_POP_UP_ERROR: "SEND_POP_UP_ERROR",
  /**
   * Отправка сообщения в виде pop-up
   */
  SEND_POP_UP_MESSAGE: "SEND_POP_UP_MESSAGE",

  /**
   * Получение информации о результате операции об авторе
   */
  RECEIVE_ON_OPERATION_AUTHOR: "RECEIVE_ON_OPERATION_AUTHOR",

  /**
   * Сохранить забаненных как фильтр для UBlock
   */
  SAVE_BANS_AS_UBLOCK: "SAVE_BANS_AS_UBLOCK",

  /**
   * Сохранить настройку
   */
  SAVE_SETTING: "SAVE_SETTING",

  /**
   * Запуск автоматического чтения произведений.
   */
  START_STIHI_AUTO_READ: "START_STIHI_AUTO_READ",

  /**
   * Запрос статуса автоматического чтения произведений.
   **/
  REQUEST_STATUS_AUTO_READ_STIHI: "REQUEST_STATUS_AUTO_READ_STIHI",
  /**
   * Получение статуса автоматического чтения произведений.
   **/
  RECEIVE_STATUS_AUTO_READ_STIHI: "RECEIVE_STATUS_AUTO_READ_STIHI",

  /**
   * Остановить автоматическое чтение произведений.
   */
  STOP_STIHI_AUTO_READ: "STOP_STIHI_AUTO_READ",

  /**
   * Получение отчёта о результатах автоматического чтения произведения.
   * Думаю, это будет одна строка. А стор на все приложение.
   */
  RECEIVE_REPORT_AUTO_READ_POEM: "RECEIVE_REPORT_AUTO_READ_POEM",

  /**
   * Получение статистики бота
   */
  RECEIVE_STATISTIC_BOT: "RECEIVE_STATISTIC_BOT",

  /**
   * Запуск настроек туннеля
   */
  START_TUNNEL_SETTINGS: "START_TUNNEL_SETTINGS",
  /**
   * Ответ об остановке настроек туннеля
   */
  RECEIVE_STOP_TUNNEL_SETTINS: "RECEIVE_STOP_TUNNEL_SETTINS",
  /**
   * Получение адресов домена
   */
  RECEIVE_DOMAIN_ADDRESS: "RECEIVE_DOMAIN_ADDRESS",
  /**
   * Получение исключённых CIDR-диапазоны для IPv4 и IPv6
   */
  RECEIVE_CALCULATE_CIDRS: "RECEIVE_CALCULATE_CIDRS",

  /**
   * Получение логов расчёта CIDR-диапазонов
   */
  RECEIVE_CALCULATE_CIDRS_LOG: "RECEIVE_CALCULATE_CIDRS_LOG",

  /**
   * Сохранение настроек туннеля
   */
  SAVE_TUNNEL_SETTINGS: "SAVE_TUNNEL_SETTINGS",

  /**
   * Получение медиа-инфо о яп
   */
  FETCH_YA_PLAKAL_TOPIC: "FETCH_YA_PLAKAL_TOPIC",

  /**
   * Получение медиа-инфо от яп
   * (В старой версии это было YAPLAKAL_RESPONSE_TOPIC, но я решил переименовать для большей ясности)
   */
  RECEIVE_YA_PLAKAL_TOPIC: "RECEIVE_YA_PLAKAL_TOPIC",

  /**
   * Получение медиа-файлов от яп
   */
  RECEIVE_YA_PLAKAL_TOPIC_MEDIA: "RECEIVE_YA_PLAKAL_TOPIC_MEDIA",

  /**
   * Изменить каталог для сохранения медиа-файлов, загружаемых через приложение.
   */
  CHANGE_SAVE_VIDEO_DIRECTORY: "CHANGE_SAVE_VIDEO_DIRECTORY",

  /**
   * Сохранение медиа-файла
   */
  SAVE_MEDIA_FILE: "SAVE_MEDIA_FILE",

  /**
   * Отправить картинку через Telegram-бота
   */
  TELEGRAM_BOT_SEND_PICTURE: "TELEGRAM_BOT_SEND_PICTURE",

  /**
   * Отправить группу медиа через Telegram-бота
   */
  TELEGRAM_BOT_SEND_GROUP: "TELEGRAM_BOT_SEND_GROUP",
};
