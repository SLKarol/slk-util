import { PropsWithChildren } from "react";

import styles from "./ListMedia.module.css";

/**
 * Контейнер для списка медиа-файлов
 */
export const ListMedia = ({ children }: PropsWithChildren) => {
  return <div className={styles.container}>{children}</div>;
};
