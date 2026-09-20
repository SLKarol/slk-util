import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import {
  IconClipboardCopy,
  IconDownload,
  IconWorld,
} from "@tabler/icons-react";

import {
  MEDIA_ACTION_COPY_LINK,
  MEDIA_ACTION_DOWNLOAD,
  MEDIA_ACTION_OPEN_IN_BROWSER,
} from "../../lib/constants";

import { type MediaResourceCardToolbarProps } from "./MediaResourceCardToolbar.types";
import { MediaResourceCardToolbarDownLoadSendTelegram } from "./MediaResourceCardToolbarDownLoadSendTelegram";
import { MediaResourceCardToolbarTelegram } from "./MediaResourceCardToolbarTelegram";

/**
 * Компонент панели инструментов для карточки медиаресурса.
 */
export const MediaResourceCardToolbar = ({
  isCollection,
  mediaId,
  onClickAction,
}: MediaResourceCardToolbarProps) => {
  return (
    <Flex gap="md" justify="center" align="center" direction="row" mt="0.5rem">
      <Tooltip label="Скачать">
        <ActionIcon
          data-id={mediaId}
          data-action={MEDIA_ACTION_DOWNLOAD}
          onClick={onClickAction}
        >
          <IconDownload />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Скопировать ссылку">
        <ActionIcon
          data-id={mediaId}
          data-action={MEDIA_ACTION_COPY_LINK}
          onClick={onClickAction}
        >
          <IconClipboardCopy />
        </ActionIcon>
      </Tooltip>
      <MediaResourceCardToolbarTelegram
        mediaId={mediaId}
        onClickAction={onClickAction}
        isCollection={isCollection}
      />
      {!isCollection && (
        <MediaResourceCardToolbarDownLoadSendTelegram
          mediaId={mediaId}
          onClickAction={onClickAction}
        />
      )}
      <Tooltip label="Открыть в броузере">
        <ActionIcon
          data-id={mediaId}
          data-action={MEDIA_ACTION_OPEN_IN_BROWSER}
          onClick={onClickAction}
        >
          <IconWorld />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};
