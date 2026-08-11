import { Textarea } from "@mantine/core";

import { useSettingsTemplatePromptFormContext } from "../../providers";

import { HOLIDAY_NAME_PATTERN } from "@shared/lib/constants";

/**
 * Настройка промптов / Поле ввода промпта для праздничного текста.
 */
export const InputTemplatePromptHoliday = () => {
  const form = useSettingsTemplatePromptFormContext();

  return (
    <Textarea
      label={`Введите промпт для генерации праздничного текста. Сам праздник обозначьте ${HOLIDAY_NAME_PATTERN}`}
      key={form.key("holiday")}
      autosize
      minRows={4}
      {...form.getInputProps("holiday")}
    />
  );
};
