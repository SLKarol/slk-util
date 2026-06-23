import { ActionIcon, Group, TextInput, Title } from "@mantine/core";
import { useInputState, useToggle } from "@mantine/hooks";
import { IconDeviceFloppy, IconEdit, IconPencilX } from "@tabler/icons-react";

import { type MediaRecordStore } from "@renderer-features/model/media-record";

import classes from "./MediaResourceCardTitle.module.css";

type Props = {
  /**
   * Объект медиазаписи, отображаемой на карточке.
   */
  mediaRecord: MediaRecordStore;
};

/**
 * Компонент для вывода/редактирования заголовка медиаресурса.
 */
export const MediaResourceCardTitle = ({ mediaRecord }: Props) => {
  const [editMode, toggleEditMode] = useToggle([false, true]);
  const [editTitle, setEditTitle] = useInputState(mediaRecord.title ?? "");

  const onClickAction = () => {
    if (!editMode) return toggleEditMode();

    mediaRecord.setTitle(editTitle);
    toggleEditMode();
  };

  const onClickEraseTitle = () => {
    if (editMode) toggleEditMode();
    mediaRecord.setTitle("");
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
