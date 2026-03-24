import { type MouseEvent } from "react";
import { Button } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import styles from "./StihiRuListLinks.module.css";

/**
 * Вывод ссылок на разделы стихов
 */
export const StihiRuListLinks = observer(() => {
  const {
    listChaptersStore: { chapters, selectedLinkIndex, setSelectedLinkIndex },
  } = useStihiRuRootStore();

  const onClick = (mouseEvent: MouseEvent<HTMLElement>) => {
    setSelectedLinkIndex(mouseEvent.currentTarget.dataset.index);
  };

  return (
    <div className={styles.container}>
      {chapters.map((chap, indexSelectedLink) => (
        <Button
          key={chap.href}
          data-index={indexSelectedLink}
          data-link={chap.href}
          variant={
            indexSelectedLink === selectedLinkIndex ? "outline" : "white"
          }
          onClick={onClick}
        >
          {chap.textContent}
        </Button>
      ))}
    </div>
  );
});
StihiRuListLinks.displayName = "StihiRuListLinks";
