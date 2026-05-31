import {
  RedditGetNewRecords,
  RedditMySubscribes,
} from "@renderer/widgets/reddit/ui";

import styles from "./RedditSelectMaterials.module.css";

/**
 * Раздел выбора материалов.
 */
export const RedditSelectMaterials = () => {
  return (
    <div className={styles.toolbar}>
      <RedditMySubscribes />
      <RedditGetNewRecords />
    </div>
  );
};
