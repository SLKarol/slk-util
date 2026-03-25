import { Flex } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import { ListVerseButtonOpenAll } from "./ListVerseButtonOpenAll";
import { ListVerseCheckBan } from "./ListVerseCheckBan";
import { StihiRuInvites } from "./StihiRuInvites";
import { StihiRuListListNew } from "./StihiRuListListNew";

/**
 * Блок со списком произведений
 */
export const StihiRuListListVerse = observer(() => {
  const {
    stihiRuPoemsStore: { hasPoems },
  } = useStihiRuRootStore();

  if (hasPoems)
    return (
      <Flex flex={1} direction="column" gap="sm">
        <ListVerseCheckBan />
        <div>
          <ListVerseButtonOpenAll />
        </div>
        <Flex>
          <StihiRuListListNew />
          <StihiRuInvites />
        </Flex>
      </Flex>
    );

  return null;
});
StihiRuListListVerse.displayName = "StihiRuListListVerse";
