import { Container, Flex } from "@mantine/core";

import { InputTelegramAdmin } from "@renderer/widgets/settings-tg-bot/ui/InputTelegramAdmin";
import { InputTelegramToken } from "@renderer/widgets/settings-tg-bot/ui/InputTelegramToken";
import { ListTelegramGroups } from "@renderer/widgets/settings-tg-bot/ui/ListTelegramGroups";
import { SaveSettings } from "@renderer/widgets/settings-tg-bot/ui/SaveSettings";
import { SettingsForm } from "@renderer/widgets/settings-tg-bot/ui/SettingsForm";

/**
 * Настройка бота
 */
export const SettingsTgBot = () => {
  return (
    <Container size="lg" pb="1rem">
      <SettingsForm>
        <InputTelegramToken />
        <InputTelegramAdmin />
        <ListTelegramGroups />
        <Flex gap="1rem">
          <SaveSettings />
        </Flex>
      </SettingsForm>
    </Container>
  );
};
