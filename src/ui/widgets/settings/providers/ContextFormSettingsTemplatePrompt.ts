import { createFormContext } from "@mantine/form";

import { type StringValueWithKey } from "@renderer/widgets/lib/types";
import { type TemplatePrompt } from "@shared/lib/types/app-settings";

/**
 * TemplatePrompt для UI, с типом listOpenersPoemReview как массив объектов { value: string, key: string }
 */
interface TemplatePromptUI extends Omit<
  TemplatePrompt,
  "listOpenersPoemReview"
> {
  /**
   * Список открывающих фраз для рецензии на стихотворение, с ключами для UI
   */
  listOpenersPoemReview: StringValueWithKey[];
}

export const [
  SettingsTemplatePromptFormProvider,
  useSettingsTemplatePromptFormContext,
  useSettingsTemplatePromptForm,
] = createFormContext<TemplatePromptUI>();
