import { type ChangeEventHandler, type MouseEventHandler } from "react";
import { Card, Checkbox, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { type MediaRecordStore } from "@renderer-features/model/media-record";

import { MediaResourceCardDimension } from "./MediaResourceCardDimension";
import { MediaResourceCardSelectDimension } from "./MediaResourceCardSelectDimension";
import { MediaResourceCardTitle } from "./MediaResourceCardTitle";
import { MediaResourceCardToolbar } from "./MediaResourceCardToolbar";
import { MediaResourceContent } from "./MediaResourceContent";

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
  mediaRecord: MediaRecordStore;
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

  /**
   * Флаг, указывающий, выбран ли элемент.
   */
  selected: boolean;
};

/**
 * Компонент карточки медиаресурса.
 *
 * Отображает информацию о медиазаписи: заголовок, превью (если доступно) и панель инструментов.
 * Предоставляет возможность выбрать элемент для дальнейшей обработки через чекбокс.
 */
export const MediaResourceCard = observer(
  ({ mediaRecord, onClickAction, onToggleSelect, selected }: Props) => {
    return (
      <Card shadow="sm" withBorder className={styles.card}>
        {mediaRecord.haveVideo ? (
          <MediaResourceCardTitle mediaRecord={mediaRecord} />
        ) : (
          <Title order={5}>{mediaRecord.title}</Title>
        )}
        <MediaResourceContent mediaRecord={mediaRecord} />
        <MediaResourceCardDimension mediaRecord={mediaRecord} />
        <MediaResourceCardToolbar
          mediaId={mediaRecord.id}
          onClickAction={onClickAction}
        />
        {mediaRecord.preview?.images && (
          <MediaResourceCardSelectDimension mediaRecord={mediaRecord} />
        )}
        {!mediaRecord.collection && !mediaRecord.haveVideo && (
          <Checkbox
            label="Добавить в список"
            checked={selected}
            data-id={mediaRecord.id}
            onChange={onToggleSelect}
          />
        )}
      </Card>
    );
  },
);
MediaResourceCard.displayName = "MediaResourceCard";
