import { Flex } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { ListVerseButtonOpenAll } from "../buttons/ListVerseButtonOpenAll";
import { CheckBoxIncludeInvite } from "../CheckBoxIncludeInvite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import { ListVerseCheckBan } from "./ListVerseCheckBan";
import { StihiRuInvites } from "./StihiRuInvites";
import { StihiRuListListNew } from "./StihiRuListListNew";

/**
 * Блок со списком произведений
 */
export const ListVerse = observer(() => {
  const {
    stihiRuPoemsStore: { hasPoems },
  } = useStihiRuRootStore();

  if (hasPoems)
    return (
      <Flex flex={1} direction="column" gap="sm">
        <ListVerseCheckBan />
        <div>
          <ListVerseButtonOpenAll />
          <CheckBoxIncludeInvite />
        </div>
        <Flex>
          <StihiRuListListNew />
          <StihiRuInvites />
        </Flex>
      </Flex>
    );

  return null;
});
ListVerse.displayName = "ListVerse";
