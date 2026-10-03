import { Textarea } from "@mantine/core";

import { useSettingsTemplatePromptFormContext } from "../../providers";

import { POEM_MY_MIND_PATTERN } from "@shared/lib/constants";

/**
 * Настройка промптов / Поле ввода промпта для моих мыслей о произведении.
 */
export const InputTemplatePromptPoemsMyMind = () => {
  const form = useSettingsTemplatePromptFormContext();

  return (
    <Textarea
      label={`Введите промпт для генерации моих мыслей о произведении. Мысли обозначьте как ${POEM_MY_MIND_PATTERN}`}
      key={form.key("myMindAboutPoems")}
      autosize
      minRows={8}
      maxRows={16}
      mb="2rem"
      {...form.getInputProps("myMindAboutPoems")}
    />
  );
};
