/**
 * Параметры к запросу на получение стихов по главе
 */
export interface LoadPoemsPayload {
  /**
   * ID главы
   */
  selectChapter: string;
  /**
   * Прерывание загрузки
   **/
  signal: AbortSignal;
}
