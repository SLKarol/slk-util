import { ActionIcon, Tooltip } from "@mantine/core";
import { IconBrandTelegram } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useRedditRootStore } from "@renderer/providers/reddit";
import { useRootStore } from "@renderer/providers/useRootStore";

export const RedditButtonSendGroup = observer(() => {
  const { sendSelectedToTelegram, busySendGroup } = useRedditRootStore();

  const {
    holidaysStore: {
      selectedHoliday,
      sendHolidayName,
      shouldWriteAboutHolidayWithAI,
    },
  } = useRootStore();

  const onClick = () => {
    sendSelectedToTelegram({
      selectedHoliday,
      sendHolidayName,
      shouldWriteAboutHolidayWithAI,
    });
  };

  return (
    <Tooltip label="Отправить выбранное">
      <ActionIcon variant="filled" disabled={busySendGroup} onClick={onClick}>
        <IconBrandTelegram />
      </ActionIcon>
    </Tooltip>
  );
});
RedditButtonSendGroup.displayName = "RedditButtonSendGroup";
