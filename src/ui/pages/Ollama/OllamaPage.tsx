import { Container, Flex, Stack, Title } from "@mantine/core";

import { useInitHandlers } from "./helpers/useInitHandlers";
import {
  OllamaModelsList,
  OllamaModelsToolbar,
} from "@renderer/widgets/ollama/ui";

/**
 * Работа с моделями Ollama
 */
export const OllamaPage = () => {
  useInitHandlers();

  return (
    <Container size="lg" pb="1rem">
      <Flex gap="xs">
        <Stack flex={1} gap="xs">
          <Title order={5}>Локально установленные модели</Title>
          <OllamaModelsToolbar />
          <OllamaModelsList />
        </Stack>
        <Stack flex={1} gap="xs">
          <Title order={5}>Логи работы</Title>
          <div>Toolbars Output</div>
          <div>Output</div>
        </Stack>
      </Flex>
    </Container>
  );
};
