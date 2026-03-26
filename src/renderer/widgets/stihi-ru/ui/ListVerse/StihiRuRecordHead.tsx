import { Button, List } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import { StihiRuButtonBanAuthor } from "./StihiRuButtonBanAuthor";
import { StihiRuRecordHeadPic } from "./StihiRuRecordHeadPic";

import styles from "./StihiRuRecordHead.module.css";

interface Props {
  /**
   * Инфа о произведении
   */
  poemHref: string;
}

/**
 * Список произведений / Название и прочая инфа
 */
export const StihiRuRecordHead = observer(({ poemHref }: Props) => {
  const {
    stihiRuPoemsStore: { poems },
    calendarStore: { referer },
  } = useStihiRuRootStore();
  const poem = poems.get(poemHref);

  const onClickTitle = () => {
    console.log("poemHref :>> ", poemHref);
    console.log("referer :>> ", referer);
    window.electronAPI.stihiRequestPoem({ hrefPoem: poemHref, referer });
  };

  return (
    <List.Item>
      <div className={styles.listItem}>
        <Button
          variant="transparent"
          color="indigo"
          className={styles.button}
          onClick={onClickTitle}
        >
          {poem.title}
        </Button>
        <span>(</span>
        <StihiRuRecordHeadPic authorId={poem.authorId} />
        <Button variant="transparent" color="gray" className={styles.button}>
          {poem.authorName}
        </Button>
        <StihiRuButtonBanAuthor poemHref={poem.href} />
        <span>)</span>
        {poem.dateTime ? <span>- {poem.dateTime}</span> : null}
      </div>
    </List.Item>
  );
});
StihiRuRecordHead.displayName = "StihiRuRecordHead";
