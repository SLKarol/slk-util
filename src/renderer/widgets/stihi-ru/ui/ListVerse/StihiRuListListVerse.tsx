import { Flex } from "@mantine/core";

import { ListVerseCheckBan } from "./ListVerseCheckBan";
import { StihiRuInvites } from "./StihiRuInvites";
import { StihiRuListListNew } from "./StihiRuListListNew";

/**
 * Блок со списком произведений
 */
export const StihiRuListListVerse = () => {
  return (
    <Flex flex={1} direction="column" gap="sm">
      <ListVerseCheckBan />
      <Flex>
        <StihiRuListListNew />
        <StihiRuInvites />
      </Flex>
    </Flex>
  );
};
