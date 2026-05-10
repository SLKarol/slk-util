import { ActionIcon, Group, TextInput, Title } from "@mantine/core";
import { useInputState, useToggle } from "@mantine/hooks";
import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";

import { type MediaRecordUi } from "@renderer-shared/types/media";

import classes from "./MediaResourceCardTitle.module.css";

type Props = {
  /**
   * Объект медиазаписи, отображаемой на карточке.
   *
   * Содержит информацию о заголовке, URL и других метаданных.
   */
  mediaRecord: MediaRecordUi;

  onChangeRecordTitle: (value: {
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

    onChangeRecordTitle({ idMediaRecord: mediaRecord.id, title: editTitle });
    toggleEditMode();
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
    </Group>
  );
};
