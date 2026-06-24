import { ActionIcon, Tooltip } from "@mantine/core";
import { IconBrandTelegram } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useRedditRootStore } from "@renderer/providers/reddit";

export const RedditButtonSendGroup = observer(() => {
  const {
    itemsToSend: { mediaRecords },
    sendSelectedToTelegram,
  } = useRedditRootStore();

  return (
    <Tooltip label="Отправить выбранное">
      <ActionIcon
        variant="filled"
        disabled={mediaRecords.length === 0}
        onClick={sendSelectedToTelegram}
      >
        <IconBrandTelegram />
      </ActionIcon>
    </Tooltip>
  );
});
RedditButtonSendGroup.displayName = "RedditButtonSendGroup";
