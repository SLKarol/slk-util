import { type ChangeEventHandler, type MouseEventHandler } from "react";
import { Card, Checkbox, Image, Text, Title } from "@mantine/core";

import { type MediaRecordUi } from "@renderer-shared/types/media";

import { MediaResourceCardDimension } from "./MediaResourceCardDimension";
import { MediaResourceCardTitle } from "./MediaResourceCardTitle";
import { MediaResourceCardToolbar } from "./MediaResourceCardToolbar";

import styles from "./MediaResourceCard.module.css";

/**
 * Свойства компонента `MediaResourceCard`.
 *
 * @interface Props
 */
type Props = {
  /**
   * Объект медиазаписи, отображаемой на карточке.
   *
   * Содержит информацию о заголовке, URL, статусе выбора и наличии медиаресурсов.
   */
  mediaRecord: MediaRecordUi;
  /**
   * Обработчик клика по кнопке действия.
   *
   * Вызывается при нажатии на кнопку в панели инструментов карточки.
   */
  onClickAction: MouseEventHandler<HTMLButtonElement>;
  /**
   * Обработчик изменения состояния чекбокса выбора элемента.
   *
   * Вызывается при переключении флажка "Добавить в список".
   * Тип события — `ChangeEventHandler`, работает с двумя элементами: `input` и `label`.
   */
  onToggleSelect: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;

  onChangeRecordTitle: (value: {
    idMediaRecord: string;
    title: string;
  }) => void;
};

/**
 * Компонент карточки медиаресурса.
 *
 * Отображает информацию о медиазаписи: заголовок, превью (если доступно) и панель инструментов.
 * Предоставляет возможность выбрать элемент для дальнейшей обработки через чекбокс.
 */
export const MediaResourceCard = ({
  mediaRecord,
  onChangeRecordTitle,
  onClickAction,
  onToggleSelect,
}: Props) => {
  return (
    <Card shadow="sm" withBorder className={styles.card}>
      {mediaRecord.haveVideo ? (
        <MediaResourceCardTitle
          mediaRecord={mediaRecord}
          onChangeRecordTitle={onChangeRecordTitle}
        />
      ) : (
        <Title order={5}>{mediaRecord.title}</Title>
      )}
      {mediaRecord.noMedia ? (
        <Text>Не содержит (или не найдены) медиа-ресурсы</Text>
      ) : !mediaRecord.haveVideo && mediaRecord.url ? (
        <Image src={mediaRecord.url} title={mediaRecord.title} w="100%" />
      ) : mediaRecord.haveVideo && mediaRecord.url ? (
        <video
          width="100%"
          controls
          poster={mediaRecord.previewDecode as string}
        >
          <source src={mediaRecord.url} />
        </video>
      ) : null}
      <MediaResourceCardDimension mediaRecord={mediaRecord} />
      <MediaResourceCardToolbar
        mediaId={mediaRecord.id}
        onClickAction={onClickAction}
      />
      {!mediaRecord.haveVideo && (
        <Checkbox
          label="Добавить в список"
          checked={mediaRecord.selected}
          data-id={mediaRecord.id}
          onChange={onToggleSelect}
        />
      )}
    </Card>
  );
};
