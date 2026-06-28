import { ActionIcon, Tooltip } from "@mantine/core";
import { IconBrandTelegram } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useRedditRootStore } from "@renderer/providers/reddit";
import { useRootStore } from "@renderer/providers/useRootStore";

export const RedditButtonSendGroup = observer(() => {
  const {
    itemsToSend: { mediaRecords },
    sendSelectedToTelegram,
  } = useRedditRootStore();

  const {
    holidaysStore: { selectedHoliday },
  } = useRootStore();

  const onClick = () => {
    sendSelectedToTelegram(selectedHoliday);
  };

  return (
    <Tooltip label="Отправить выбранное">
      <ActionIcon
        variant="filled"
        disabled={mediaRecords.length < 2}
        onClick={onClick}
      >
        <IconBrandTelegram />
      </ActionIcon>
    </Tooltip>
  );
});
RedditButtonSendGroup.displayName = "RedditButtonSendGroup";
