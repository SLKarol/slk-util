/**
 * API для взаимодействия с Electron
 */
export interface ElectronAPI {
  /**
   * Обработчик выбора пункта меню
   * @param callback функция-обработчик принимает URL
   * @returns Функцию- отписку от события
   */
  onSelectMenu: (callback: (url: string) => void) => () => void;
}
