import { Flex, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { ListVerseButtonOpenAll } from "../buttons/ListVerseButtonOpenAll";
import { CheckBoxIncludeInvite } from "../CheckBoxIncludeInvite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import { ListVerseCheckBan } from "./ListVerseCheckBan";
import { StihiRuInvites } from "./StihiRuInvites";
import { StihiRuListListNew } from "./StihiRuListListNew";

import styles from "./ListVerse.module.css";

/**
 * Блок со списком произведений
 */
export const ListVerse = observer(() => {
  const {
    stihiRuPoemsStore: { hasPoems },
  } = useStihiRuRootStore();

  if (hasPoems)
    return (
      <div className={styles.container}>
        <ListVerseCheckBan />
        <div>
          <ListVerseButtonOpenAll />
          <CheckBoxIncludeInvite />
        </div>
        <div className={styles.headerPoems}>
          <Title order={3} className={styles.flexGrow}>
            Новые произведения
          </Title>
          <Title order={3} className={styles.flexGrow}>
            Авторы приглашают
          </Title>
        </div>
        <div className={styles.poems}>
          <StihiRuListListNew />
          <StihiRuInvites />
        </div>
      </div>
    );

  return null;
});
ListVerse.displayName = "ListVerse";
