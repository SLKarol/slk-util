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
    listChaptersStore: { arrayLinks, selectedLinkIndex, setSelectedLinkIndex },
  } = useStihiRuRootStore();

  const onClick = (mouseEvent: MouseEvent<HTMLElement>) => {
    setSelectedLinkIndex(mouseEvent.currentTarget.dataset.index);
  };

  return (
    <div className={styles.container}>
      {arrayLinks.map((chap, indexSelectedLink) => (
        <Button
          key={chap.link}
          data-index={indexSelectedLink}
          variant={
            indexSelectedLink === selectedLinkIndex ? "outline" : "white"
          }
          onClick={onClick}
        >
          {chap.caption}
        </Button>
      ))}
    </div>
  );
});
StihiRuListLinks.displayName = "StihiRuListLinks";
