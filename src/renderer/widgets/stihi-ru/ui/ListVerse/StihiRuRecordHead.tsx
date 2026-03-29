import { Button, List } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { OpenPoem } from "@widgets/stihi-ru/ui/buttons/OpenPoem";

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
  } = useStihiRuRootStore();
  const poem = poems.get(poemHref);

  return (
    <List.Item>
      <div className={styles.listItem}>
        <OpenPoem href={poemHref} title={poem.title} />
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
