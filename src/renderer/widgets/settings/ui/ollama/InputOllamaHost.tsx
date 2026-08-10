import { TextInput } from "@mantine/core";

import { useSettingsOllamaFormContext } from "../../providers";

/**
 * Настройка Ollama / Поле ввода URL API сервера
 */
export const InputOllamaHost = () => {
  const form = useSettingsOllamaFormContext();

  return (
    <TextInput
      label="URL API сервера"
      key={form.key("host")}
      {...form.getInputProps("host")}
    />
  );
};
