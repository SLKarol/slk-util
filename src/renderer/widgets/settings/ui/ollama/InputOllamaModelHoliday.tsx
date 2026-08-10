import { TextInput } from "@mantine/core";

import { useSettingsOllamaFormContext } from "../../providers";

/**
 * Настройка Ollama / Поле ввода модели для генерации поздравления
 */
export const InputOllamaModelHoliday = () => {
  const form = useSettingsOllamaFormContext();

  return (
    <TextInput
      label="Какая модель используется для генерации поздравления"
      key={form.key("model.holiday")}
      {...form.getInputProps("model.holiday")}
    />
  );
};
