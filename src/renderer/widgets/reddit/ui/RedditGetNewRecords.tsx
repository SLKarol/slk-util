import { ActionIcon, Tooltip } from "@mantine/core";
import { IconCloudDownload } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useRedditRootStore } from "@renderer/providers/reddit";

import styles from "./RedditGetNewRecords.module.css";

/**
 * Кнопка получения новых записей в выбранном канале reddit
 */
export const RedditGetNewRecords = observer(() => {
  const {
    redditSelectedStore: { selectedRedditChannel },
    redditReceiveNewRecords,
    busy,
  } = useRedditRootStore();

  return (
    <Tooltip label="Запросить новые записи">
      <ActionIcon
        className={styles.button}
        disabled={!selectedRedditChannel || busy}
        onClick={redditReceiveNewRecords}
      >
        <IconCloudDownload size={16} />
      </ActionIcon>
    </Tooltip>
  );
});
RedditGetNewRecords.displayName = "RedditGetNewRecords";
