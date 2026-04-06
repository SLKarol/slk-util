import { Button } from "@mantine/core";

import { type SihiPoem } from "@shared/lib/types/stihiru.types";

import styles from "./OpenAuthor.module.css";

type Props = {
  authorId: SihiPoem["authorId"];
  authorName: SihiPoem["authorName"];
};

/**
 * Кнопка открытия страницы автора
 */
export const OpenAuthor = ({ authorId, authorName }: Props) => {
  const onClick = () => {
    window.electronAPI.stihiOpenAuthor(authorId);
  };
  return (
    <Button
      variant="transparent"
      color="gray"
      className={styles.button}
      onClick={onClick}
    >
      {authorName}
    </Button>
  );
};
