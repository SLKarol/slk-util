import { Flex } from "@mantine/core";

import { StihiRuInvites } from "./StihiRuInvites";
import { StihiRuListListNew } from "./StihiRuListListNew";

/**
 * Блок со списком произведений
 */
export const StihiRuListListVerse = () => {
  return (
    <Flex>
      <StihiRuListListNew />
      <StihiRuInvites />
    </Flex>
  );
};
