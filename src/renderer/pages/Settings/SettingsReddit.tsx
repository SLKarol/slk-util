import { Container, Flex } from "@mantine/core";

import {
  InputRedditProperty,
  SettingsFormReddit,
} from "@renderer/widgets/settings/ui";
import { SaveSettings } from "@renderer/widgets/shared/ui";

/**
 * Настройка Reddit / Форма
 */
export const SettingsReddit = () => {
  return (
    <Container size="lg" pb="1rem">
      <SettingsFormReddit>
        <InputRedditProperty keyName="redditUserName" />
        <InputRedditProperty keyName="redditPassword" />
        <InputRedditProperty keyName="redditAppId" />
        <InputRedditProperty keyName="redditApiSecret" />
        <InputRedditProperty keyName="redditLimitRecords" />
        <Flex gap="1rem">
          <SaveSettings />
        </Flex>
      </SettingsFormReddit>
    </Container>
  );
};
