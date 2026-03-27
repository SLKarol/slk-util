import { type AppSettings } from "./app-settings";

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
