import { Container, Flex } from "@mantine/core";

import { PromptProps } from "./PromptProps";
import { Poem } from "./Poem";
import { PromptResult } from "./PromptResult";

/**
 * Контейнер для написания отклика
 */
export const WriteReviewPage = () => {
  return (
    <Container size="lg" pb="1rem" pt="1rem">
      <Flex gap="xs" justify="flex-start" align="flex-start" direction="row">
        <PromptProps />
        <Poem />
      </Flex>
      <PromptResult />
    </Container>
  );
};
