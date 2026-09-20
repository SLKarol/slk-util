import { TextInput } from "@mantine/core";

import { useSettingsFormContext } from "../providers/ContextFormSettingsTunnel";

export const InputTelegramToken = () => {
  const form = useSettingsFormContext();
  return (
    <TextInput
      label="Токен телеграм-бота"
      key={form.key("telegramToken")}
      {...form.getInputProps("telegramToken")}
    />
  );
};
