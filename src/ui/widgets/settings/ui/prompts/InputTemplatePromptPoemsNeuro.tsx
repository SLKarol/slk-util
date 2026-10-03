import { Textarea } from "@mantine/core";

import { useSettingsTemplatePromptFormContext } from "../../providers";

import { POEM_NEURO_PATTERN } from "@shared/lib/constants";

/**
 * Настройка промптов / Поле ввода промпта для стихотворных произведений.
 */
export const InputTemplatePromptPoemsNeuro = () => {
  const form = useSettingsTemplatePromptFormContext();

  return (
    <Textarea
      label={`Введите промпт для генерации отклика на нейро-творчество. Само произведение ${POEM_NEURO_PATTERN}`}
      key={form.key("reviewOfNeuroPoems")}
      autosize
      minRows={8}
      maxRows={16}
      mb="2rem"
      {...form.getInputProps("reviewOfNeuroPoems")}
    />
  );
};
