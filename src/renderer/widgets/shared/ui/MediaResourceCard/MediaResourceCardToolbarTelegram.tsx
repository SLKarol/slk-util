import { ActionIcon, Tooltip } from "@mantine/core";
import { IconBrandTelegram } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { MEDIA_ACTION_TELEGRAM } from "../../lib/constants";

import { useRootStore } from "@renderer/providers/useRootStore";

import { type MediaResourceCardToolbarProps } from "./MediaResourceCardToolbar.types";

export const MediaResourceCardToolbarTelegram = observer(
  ({ mediaId, onClickAction, isCollection }: MediaResourceCardToolbarProps) => {
    const {
      mediaSendWatch: { telegramSendFileStatus },
    } = useRootStore();

    const disabled = telegramSendFileStatus.has(mediaId);

    return (
      <Tooltip
        label={
          isCollection
            ? "Отправить коллекцию в телеграм"
            : "Отправить ссылку в телеграм"
        }
      >
        <ActionIcon
          data-id={mediaId}
          data-action={MEDIA_ACTION_TELEGRAM}
          onClick={onClickAction}
          disabled={disabled}
        >
          <IconBrandTelegram />
        </ActionIcon>
      </Tooltip>
    );
  },
);
MediaResourceCardToolbarTelegram.displayName =
  "MediaResourceCardToolbarTelegram";
