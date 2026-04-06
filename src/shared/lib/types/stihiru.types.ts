/**
 * Интерфейс для стихотворения на сайте "Стихи.ру"
 **/
export interface SihiPoem {
  /**
   * URL of the poem on stihi.ru - Это ключевое поле
   */
  href: string;
  /**
   * Ник автора на stihi.ru
   */
  authorId: string;
  /**
   * Имя автора на stihi.ru
   */
  authorName: string;
  /**
   * Заголовок стихотворения на stihi.ru
   */
  title: string;
  /**
   * Дата публикации стихотворения на stihi.ru.
   */
  dateTime?: string;
  /**
   * Автор приглашает вас прочитать стихотворение?
   */
  invite?: boolean;
}
