import { Flex } from "@mantine/core";

import { PromptResultToolbar } from "./PromptResultToolbar";
import { PromptResultMind } from "./PromptResultMind";
import { ReactionText } from "./ReactionText";

/**
 * Контейнер вывода результата промпта
 */
export const PromptResult = () => {
  return (
    <Flex gap="xs" justify="flex-start" align="flex-start" direction="column">
      <PromptResultMind />
      <PromptResultToolbar />
      <ReactionText />
    </Flex>
  );
};
