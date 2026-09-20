import { type MouseEventHandler } from "react";
/**
 * Свойства компонента `MediaResourceCardToolbar`.
 */
export interface MediaResourceCardToolbarProps {
  /**
   * Уникальный идентификатор медиазаписи, к которой относится панель инструментов.
   */
  mediaId: string;

  /**
   * Обработчик клика по кнопке действия (например, скачивание или отправка в Telegram).
   *
   * Вызывается при нажатии на одну из иконок в панели инструментов.
   * Определяет действие на основе атрибута `data-action`.
   */
  onClickAction: MouseEventHandler<HTMLButtonElement>;

  /**
   * Этот ресурс является коллекцией?
   */
  isCollection?: boolean;
}
