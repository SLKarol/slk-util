import { Flex } from "@mantine/core";

import { PromptResultToolbar } from "./PromptResultToolbar";
import { PromptResultThought } from "./PromptResultThought";
import { PromptResultOutput } from "./PromptResultOutput";

/**
 * Контейнер вывода результата промпта
 */
export const PromptResult = () => {
  return (
    <Flex gap="xs" justify="flex-start" align="flex-start" direction="column">
      <PromptResultThought />
      <PromptResultToolbar />
      <PromptResultOutput />
    </Flex>
  );
};
