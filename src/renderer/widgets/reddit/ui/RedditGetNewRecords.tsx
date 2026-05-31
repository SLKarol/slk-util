import { ActionIcon } from "@mantine/core";
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
  } = useRedditRootStore();

  return (
    <ActionIcon className={styles.button} disabled={!selectedRedditChannel}>
      <IconCloudDownload size={16} />
    </ActionIcon>
  );
});
RedditGetNewRecords.displayName = "RedditGetNewRecords";
