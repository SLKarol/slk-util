import { Container, Flex } from "@mantine/core";

import {
  InputTemplatePromptHoliday,
  SettingsFormTemplatePrompt,
} from "@renderer/widgets/settings/ui";
import { SaveSettings } from "@renderer/widgets/shared/ui";

/**
 * Форма настроек промптов
 */
export const SettingsPromptTemplate = () => {
  return (
    <Container size="lg" pb="1rem">
      <SettingsFormTemplatePrompt>
        <InputTemplatePromptHoliday />
        <Flex gap="1rem">
          <SaveSettings />
        </Flex>
      </SettingsFormTemplatePrompt>
    </Container>
  );
};
