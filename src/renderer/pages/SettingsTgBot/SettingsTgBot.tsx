import { Container } from "@mantine/core";

import { InputTelegramAdmin } from "@renderer/widgets/settings-tg-bot/ui/InputTelegramAdmin";
import { InputTelegramToken } from "@renderer/widgets/settings-tg-bot/ui/InputTelegramToken";
import { SettingsForm } from "@renderer/widgets/settings-tg-bot/ui/SettingsForm";

export const SettingsTgBot = () => {
  return (
    <Container size="lg" pb="1rem">
      <SettingsForm>
        <InputTelegramToken />
        <InputTelegramAdmin />
      </SettingsForm>
    </Container>
  );
};
