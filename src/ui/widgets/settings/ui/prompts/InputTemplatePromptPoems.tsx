import { Textarea } from "@mantine/core";

import { useSettingsTemplatePromptFormContext } from "../../providers";

import { POEM_PATTERN } from "@shared/lib/constants";

/**
 * Настройка промптов / Поле ввода промпта для стихотворных произведений.
 */
export const InputTemplatePromptPoems = () => {
  const form = useSettingsTemplatePromptFormContext();

  return (
    <Textarea
      label={`Введите промпт для генерации отклика на стихи. Само произведение ${POEM_PATTERN}`}
      key={form.key("reviewOfPoems")}
      autosize
      minRows={8}
      maxRows={16}
      mb="2rem"
      {...form.getInputProps("reviewOfPoems")}
    />
  );
};
