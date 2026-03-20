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
