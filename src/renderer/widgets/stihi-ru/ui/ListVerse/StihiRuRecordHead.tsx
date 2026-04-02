import { List } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { OpenAuthor } from "../buttons/OpenAuthor";

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
      <OpenPoem href={poemHref} title={poem.title} />
      <span className={styles.authorContainer}>
        <span>(</span>
        <StihiRuRecordHeadPic authorId={poem.authorId} />
        <OpenAuthor authorId={poem.authorId} authorName={poem.authorName} />
        <StihiRuButtonBanAuthor poemHref={poem.href} />
        <span>)</span>
      </span>
      {poem.dateTime ? <span>- {poem.dateTime}</span> : null}
    </List.Item>
  );
});
StihiRuRecordHead.displayName = "StihiRuRecordHead";
