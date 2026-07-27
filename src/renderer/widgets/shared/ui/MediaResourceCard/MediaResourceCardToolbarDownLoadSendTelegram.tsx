import { ActionIcon, Tooltip } from "@mantine/core";
import { IconLocationDown } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { MEDIA_ACTION_DOWNLOAD_SEND_TELEGRAM } from "../../lib/constants";

import { useRootStore } from "@renderer/providers/useRootStore";

import { type MediaResourceCardToolbarProps } from "./MediaResourceCardToolbar.types";

export const MediaResourceCardToolbarDownLoadSendTelegram = observer(
  ({ mediaId, onClickAction }: MediaResourceCardToolbarProps) => {
    const {
      mediaSendWatch: { telegramSendFileStatus },
    } = useRootStore();

    const disabled = telegramSendFileStatus.has(mediaId);

    return (
      <Tooltip label="Скачать и отправить в телеграм">
        <ActionIcon
          data-id={mediaId}
          data-action={MEDIA_ACTION_DOWNLOAD_SEND_TELEGRAM}
          onClick={onClickAction}
          disabled={disabled}
        >
          <IconLocationDown />
        </ActionIcon>
      </Tooltip>
    );
  },
);
MediaResourceCardToolbarDownLoadSendTelegram.displayName =
  "MediaResourceCardToolbarDownLoadSendTelegram";
