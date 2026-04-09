import {
  type AppSettings,
  type AppSettingsWireGuardTunnel,
} from "./app-settings";
import { type WriteSettingsProps } from "./settings.type";
import { type IStatusAutoReadStihi } from "./stihi.types";

/**
 * API для взаимодействия с Electron
 */
export interface ElectronAPI {
  /**
   * Задать обработчик выбора пункта меню
   * @param callback функция-обработчик принимает URL
   * @returns Функцию- отписку от события
   */
  onSelectMenu: (callback: (url: string) => void) => () => void;

  /**
   * GET-запрос текстовой информации. Как правило это HTML.
   * @param url адрес url
   */
  fetchText: (url: string) => string;

  /**
   * Задать обработчик получения текстовой информации.
   * @param callback функция-обработчик принимает текстовую информацию, см. ReceiveText
   * @returns Функцию- отписку от события
   */
  onReceiveText: (callback: (receiveText: ReceiveText) => void) => () => void;

  /**
   * Запрос настроек.
   */
  fetchSettings: () => void;
  /**
   * Задать обработчик получения настроек.
   * @param callback функция-обработчик. Принимает AppSettings
   * @returns Функция- отписка от события
   */
  onReceiveSetting: (callback: (settings: AppSettings) => void) => () => void;

  /**
   * Сохранить значение настройки
   */
  saveSetting: (settings: WriteSettingsProps) => void;

  /**
   * Запрос списка забаненных авторов
   */
  fetchBanAuthors: () => void;

  /**
   * Задать обработчик получения списка забаненных авторов.
   * @param callback  функция-обработчик. Принимает массив строк
   * @returns Функция- отписка от события
   */
  onReceiveBanAuthors: (callback: (list: string[]) => void) => () => void;

  /**
   * Открыть произведение по ссылке на сайте stihi.ru в броузере
   * @param hrefPoem Ссылка на произведение, без указания сайта
   */
  stihiOpenPoem: (hrefPoem: string) => void;

  /**
   * Открыть все видимые произведение по ссылке на сайте stihi.ru в броузере
   * @param hrefsPoems Массив ссылок на произведения
   */
  stihiOpenAllPoems: (hrefsPoems: string[]) => void;

  /**
   * Добавить автора в список забаненных
   * @param author Логин автора
   */
  addBanAuthor: (author: string) => void;
  /**
   * Удалить автора из списка забаненных
   * @param author Логин автора
   */
  removeBanAuthor: (author: string) => void;

  /**
   * Открыть страницу автора по ссылке на сайте stihi.ru в броузере
   * @param authorId Id автора
   */
  stihiOpenAuthor: (authorId: string) => void;

  /**
   * Проверить имя программы браузера
   */
  checkBrowserProgramRun: (browserProgramName: string) => void;

  /**
   * Задать обработчик получения всплывашки об ошибке.
   * @param callback функция-обработчик принимает текстовую информацию, см. ReceiveText
   * @returns Функцию- отписку от события
   */
  onReceivePopErrorMessage: (callback: (message: string) => void) => () => void;

  /**
   * Задать обработчик получения всплывашки об ошибке.
   * @param callback функция-обработчик принимает текстовую информацию, см. ReceiveText
   * @returns Функцию- отписку от события
   */
  onReceivePopMessage: (callback: (message: string) => void) => () => void;

  /**
   * Задать обработчик получения результата операции над автором.
   * @param callback функция-обработчик принимает ReceiveOperationAuthort
   * @returns Функцию- отписку от события
   */
  onReceiveOperationAuthor: (
    callback: (data: ReceiveOperationAuthor) => void,
  ) => () => void;

  /**
   * Сохранить список забаненных авторов как список для Ublock Origin
   */
  saveBansAsUblock: () => void;

  /**
   * Начать авто-читку произведений. Стихи будут открываться в браузере.
   * @param stringDateTime Дата и время в виде строки, с которых начать авто-читку.
   */
  startStihiAutoRead: (stringDateTime: string) => void;

  /**
   * Запрос статуса авто-читки произведений.
   */
  requestStatusAutoReadStihi: () => void;

  receiveStatusAutoReadStihi: (
    callback: (statusAutoReadStihi: IStatusAutoReadStihi) => void,
  ) => () => void;

  /**
   * Остановить авто-читку произведений.
   */
  stopStihiAutoRead: () => void;

  /**
   * Получить строку статистики авто-читки от main процесса. Строка - возможно нужно будет как-то изменить этот тип.
   */
  onReceiveStihiAutoRead: (callback: (message: string) => void) => () => void;

  onReceiveStatisticBot: (
    callback: (message: ReceiveStatisticBotData) => void,
  ) => () => void;

  /**
   * Запуск настройки WireGuard.
   * Вызывается из клиента.
   */
  startTunnelSettings: (
    settings: Omit<AppSettingsWireGuardTunnel, "allowedIPs">,
  ) => void;
  /**
   * Остановка настройки WireGuard.
   * Вызывается из главного процесса.
   */
  receiveStopTunnelSettins: (callback: () => void) => () => void;
}

/**
 * Получение текстовой информации
 */
export interface ReceiveText {
  /**
   * Параметр запроса. Как правило это URL.
   */
  requestParam: unknown;
  /**
   * Текстовая информация. Как правило это HTML.
   **/
  textContent: string;
}

/**
 * Результат операции над автором: добавление в бан или удаление из бана
 */
export interface ReceiveOperationAuthor {
  /**
   * true - автор добавлен в бан, false - автор удалён из бана
   */
  add: boolean;
  /**
   * Логин автора
   */
  author: string;
}

/**
 * Интерфейс, описывающий данные статистики бота, получаемые в процессе рендера.
 *
 * Объекты, соответствующие этому интерфейсу, используются для передачи
 * информации о событиях бота, включая временну́ю метку и текст сообщения.
 */
export interface ReceiveStatisticBotData {
  /**
   * Дата и время события в формате ISO строки.
   *
   * Представляет момент времени, когда было зафиксировано событие.
   * Пример: `"2023-11-20T14:30:45.123Z"`.
   */
  date: string;

  /**
   * Текстовое сообщение, содержащее информацию о событии или действии бота.
   *
   * Может включать сведения о типе операции, результате, ошибках и т.д.
   */
  message: string;
}
