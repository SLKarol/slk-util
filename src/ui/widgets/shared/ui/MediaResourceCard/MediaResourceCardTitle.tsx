import { ActionIcon, Group, TextInput, Title } from "@mantine/core";
import { useInputState, useToggle } from "@mantine/hooks";
import { IconDeviceFloppy, IconEdit, IconPencilX } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { type MediaRecordStore } from "@renderer-features/model/media-record";

import classes from "./MediaResourceCardTitle.module.css";

type Props = {
  /**
   * Объект медиазаписи, отображаемой на карточке.
   */
  mediaRecord: MediaRecordStore;

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
 * Компонент для вывода/редактирования заголовка медиаресурса.
 */
export const MediaResourceCardTitle = observer(
  ({ mediaRecord, setRecordTitle }: Props) => {
    const [editMode, toggleEditMode] = useToggle([false, true]);
    const [editTitle, setEditTitle] = useInputState(mediaRecord.title ?? "");

    const id = mediaRecord.id;

    const onClickAction = () => {
      if (!editMode) return toggleEditMode();

      setRecordTitle?.({ idMediaRecord: id, title: editTitle });
      toggleEditMode();
    };

    const onClickEraseTitle = () => {
      if (editMode) toggleEditMode();
      setRecordTitle?.({ idMediaRecord: mediaRecord.id, title: "" });
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
        {setRecordTitle && (
          <>
            <ActionIcon variant="filled" onClick={onClickAction}>
              {!editMode ? <IconEdit /> : <IconDeviceFloppy />}
            </ActionIcon>
            <ActionIcon variant="filled" onClick={onClickEraseTitle}>
              <IconPencilX />
            </ActionIcon>
          </>
        )}
      </Group>
    );
  },
);
MediaResourceCardTitle.displayName = "MediaResourceCardTitle";
