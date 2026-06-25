import { type MouseEventHandler } from "react";
import { Card, Image } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { type MediaRecordUi } from "@renderer-shared/types/media";

import { MediaResourceCardDimension } from "./MediaResourceCardDimension";
import { MediaResourceCardForPostToolbar } from "./MediaResourceCardForPostToolbar";
import { MediaResourceCardTitle } from "./MediaResourceCardTitle";

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

  /**
   * Функция для установки заголовка медиа-записи.
   */
  setRecordTitle?: ({
    idMediaRecord,
    title,
  }: {
    idMediaRecord: string;
    title: string;
  }) => void;
};

/**
 * Компонент карточки медиаресурса, используемый в контексте публикации (рассылки).
 *
 * Отображает заголовок и превью медиа по URL. В отличие от базовой карточки,
 * не содержит чекбокса выбора — предназначена для уже выбранных элементов.
 * Включает панель инструментов.
 */
export const MediaResourceCardForPost = observer(
  ({ mediaRecord, onClickAction, setRecordTitle }: Props) => {
    return (
      <Card shadow="sm" withBorder className={styles.card}>
        <MediaResourceCardTitle
          mediaRecord={mediaRecord}
          setRecordTitle={setRecordTitle}
        />
        <Image
          src={mediaRecord.fileDecode}
          title={mediaRecord.title}
          w="100%"
        />
        <MediaResourceCardDimension mediaRecord={mediaRecord} />
        <MediaResourceCardForPostToolbar
          mediaId={mediaRecord.id}
          onClickAction={onClickAction}
        />
      </Card>
    );
  },
);
MediaResourceCardForPost.displayName = "MediaResourceCardForPost";
