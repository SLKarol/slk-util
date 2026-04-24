import { type MouseEventHandler } from "react";
import { Card, Image, Title } from "@mantine/core";

import { type MediaRecordUi } from "@renderer-shared/types/media";

import { MediaResourceCardForPostToolbar } from "./MediaResourceCardForPostToolbar";

import styles from "./MediaResourceCard.module.css";

/**
 * Свойства компонента `MediaResourceCardForPost`.
 *
 * @interface Props
 */
type Props = {
  /**
   * Объект медиазаписи, отображаемой на карточке.
   *
   * Содержит информацию о заголовке, URL и других метаданных.
   */
  mediaRecord: MediaRecordUi;
  /**
   * Обработчик клика по кнопке действия (например, удаление или редактирование).
   *
   * Вызывается при нажатии на кнопку в панели инструментов карточки.
   */
  onClickAction: MouseEventHandler<HTMLButtonElement>;
};

/**
 * Компонент карточки медиаресурса, используемый в контексте публикации (рассылки).
 *
 * Отображает заголовок и превью медиа по URL. В отличие от базовой карточки,
 * не содержит чекбокса выбора — предназначена для уже выбранных элементов.
 * Включает панель инструментов.
 */
export const MediaResourceCardForPost = ({
  mediaRecord,
  onClickAction,
}: Props) => {
  return (
    <Card shadow="sm" withBorder className={styles.card}>
      <Title order={5}>{mediaRecord.title}</Title>
      <Image src={mediaRecord.url} title={mediaRecord.title} w="100%" />
      <MediaResourceCardForPostToolbar
        mediaId={mediaRecord.id}
        onClickAction={onClickAction}
      />
    </Card>
  );
};
