import { ActionIcon, Tooltip } from "@mantine/core";
import { IconEraser } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useRedditRootStore } from "@renderer/providers/reddit";

export const RedditButtonClearSelected = observer(() => {
  const {
    itemsToSend: { clearItems },
  } = useRedditRootStore();

  return (
    <Tooltip label="Очистить выбранное">
      <ActionIcon variant="filled" onClick={clearItems}>
        <IconEraser />
      </ActionIcon>
    </Tooltip>
  );
});
RedditButtonClearSelected.displayName = "RedditButtonClearSelected";
