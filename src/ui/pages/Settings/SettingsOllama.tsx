import { Container, Flex } from "@mantine/core";

import {
  InputOllamaHost,
  InputOllamaModelHoliday,
  SettingsFormOllama,
} from "@renderer/widgets/settings/ui";
import { SaveSettings } from "@renderer/widgets/shared/ui";

/**
 * Настройка Ollama / Форма
 */
export const SettingsOllama = () => {
  return (
    <Container size="lg" pb="1rem">
      <SettingsFormOllama>
        <InputOllamaHost />
        <InputOllamaModelHoliday />
        <Flex gap="1rem">
          <SaveSettings />
        </Flex>
      </SettingsFormOllama>
    </Container>
  );
};
