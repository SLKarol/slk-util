import { TextInput } from "@mantine/core";

import { useSettingsFormContext } from "../providers/ContextFormSettingsTunnel";

export const InputTelegramAdmin = () => {
  const form = useSettingsFormContext();

  return (
    <TextInput
      label="ID телеграм-чата бота с админом. Сюда будут записываться картинки для отправки в альбомы."
      key={form.key("telegramAdmin")}
      {...form.getInputProps("telegramAdmin")}
    />
  );
};
