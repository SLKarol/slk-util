import { type SihiChapter } from "@shared/lib/types/stihi.types";

/**
 * Интерфейс для истории просмотра глав
 */
export interface StihiChaperHidtory extends SihiChapter {
  /**
   * Идентификатор истории
   */
  idHistory: string;
}

/**
 * Интерфейс, представляющий вкладку stihi.ru.
 *
 * @interface StihiRuTab
 */
export interface StihiRuTab {
  /**
   * Уникальный идентификатор вкладки.
   *
   * @type {string}
   */
  id: string;

  /**
   * Отображаемое название вкладки.
   *
   * @type {string}
   */
  title: string;

  /**
   * Эта вкладка для чтения?
   *
   * @type {boolean}
   */
  readonly: boolean;
}
