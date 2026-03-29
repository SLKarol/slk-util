import { Button } from "@mantine/core";

import styles from "@widgets/stihi-ru/ui/ListVerse/StihiRuRecordHead.module.css";

interface OpenPoemProps {
  href: string;
  title: string;
}

/**
 * Произведение / Название стихотворения, открывающееся при клике на него.
 */
export const OpenPoem = ({ href, title }: OpenPoemProps) => {
  const onClickTitle = () => {
    window.electronAPI.stihiOpenPoem(href);
  };

  return (
    <Button
      variant="transparent"
      color="indigo"
      className={styles.button}
      onClick={onClickTitle}
    >
      {title}
    </Button>
  );
};
