export interface VisitPoemsByAuthorData {
  /**
   * Ссылка на произведение
   */
  href: string;
  /**
   * Дата и время посещения произведения
   */
  dateTime: string;
}

/**
 * Мап ссылок на произведения и даты их посещения
 * Ключ - authorId
 */
export type MapVisitPoemsByAuthor = Map<string, VisitPoemsByAuthorData[]>;

/**
 * Параметры для добавления посещения произведения
 */
export interface AddVisitPoemPayload {
  /**
   * Ссылка на произведение
   */
  href: string;
  /**
   * Идентификатор автора произведения
   */
  authorId: string;
}
