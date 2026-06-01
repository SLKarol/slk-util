import {
  RedditGetNewRecords,
  RedditMySubscribes,
  RedditSearchChannels,
} from "@renderer/widgets/reddit/ui";

import styles from "./RedditSelectMaterials.module.css";

/**
 * Раздел выбора материалов.
 */
export const RedditSelectMaterials = () => {
  return (
    <div className={styles.toolbar}>
      <RedditSearchChannels />
      <RedditMySubscribes className={styles.row2} />
      <RedditGetNewRecords />
    </div>
  );
};
