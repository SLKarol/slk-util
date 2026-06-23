import { ActionIcon, Group, TextInput, Title } from "@mantine/core";
import { useInputState, useToggle } from "@mantine/hooks";
import { IconDeviceFloppy, IconEdit, IconPencilX } from "@tabler/icons-react";

import { type MediaRecordStore } from "@renderer-features/model/media-record";

import classes from "./MediaResourceCardTitle.module.css";

type Props = {
  /**
   * Объект медиазаписи, отображаемой на карточке.
   *
   * Содержит информацию о заголовке, URL и других метаданных.
   */
  mediaRecord: MediaRecordStore;

  /**
   * Функция, вызываемая при изменении названия медиазаписи.
   */
  onChangeRecordTitle?: (value: {
    idMediaRecord: string;
    title: string;
  }) => void;
};

/**
 * Компонент для вывода/редактирования заголовка медиаресурса.
 */
export const MediaResourceCardTitle = ({
  mediaRecord,
  onChangeRecordTitle,
}: Props) => {
  const [editMode, toggleEditMode] = useToggle([false, true]);
  const [editTitle, setEditTitle] = useInputState(mediaRecord.title ?? "");

  const onClickAction = () => {
    if (!editMode) return toggleEditMode();

    onChangeRecordTitle?.({ idMediaRecord: mediaRecord.id, title: editTitle });
    toggleEditMode();
  };

  const onClickEraseTitle = () => {
    if (editMode) toggleEditMode();
    onChangeRecordTitle?.({ idMediaRecord: mediaRecord.id, title: "" });
  };

  return (
    <Group className={classes.group}>
      {!editMode ? (
        <Title order={5} flex={1}>
          {mediaRecord.title}
        </Title>
      ) : (
        <TextInput value={editTitle} onChange={setEditTitle} flex={1} />
      )}
      <ActionIcon variant="filled" onClick={onClickAction}>
        {!editMode ? <IconEdit /> : <IconDeviceFloppy />}
      </ActionIcon>
      <ActionIcon variant="filled" onClick={onClickEraseTitle}>
        <IconPencilX />
      </ActionIcon>
    </Group>
  );
};
