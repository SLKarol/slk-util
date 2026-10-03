import { TextInput } from "@mantine/core";

import { useSettingsOllamaFormContext } from "../../providers";

/**
 * Настройка Ollama / Поле ввода модели для генерации реакции на произведения
 */
export const InputOllamaModelPoems = () => {
  const form = useSettingsOllamaFormContext();

  return (
    <TextInput
      label="Какая модель используется для генерации откликов на произведения"
      key={form.key("model.reviewOfPoems")}
      mb="2rem"
      {...form.getInputProps("model.reviewOfPoems")}
    />
  );
};
