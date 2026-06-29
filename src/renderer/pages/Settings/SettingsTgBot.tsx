import { Container, Flex } from "@mantine/core";

import { InputTelegramAdmin } from "@renderer/widgets/settings-tg-bot/ui/InputTelegramAdmin";
import { InputTelegramToken } from "@renderer/widgets/settings-tg-bot/ui/InputTelegramToken";
import { InputWait } from "@renderer/widgets/settings-tg-bot/ui/InputWait";
import { ListTelegramGroups } from "@renderer/widgets/settings-tg-bot/ui/ListTelegramGroups";
import { SettingsForm } from "@renderer/widgets/settings-tg-bot/ui/SettingsForm";
import { SaveSettings } from "@renderer/widgets/shared/ui";

/**
 * Настройка бота
 */
export const SettingsTgBot = () => {
  return (
    <Container size="lg" pb="1rem">
      <SettingsForm>
        <InputTelegramToken />
        <InputTelegramAdmin />
        <InputWait />
        <ListTelegramGroups />
        <Flex gap="1rem">
          <SaveSettings />
        </Flex>
      </SettingsForm>
    </Container>
  );
};
