import { createFormContext } from "@mantine/form";

import { type TemplatePrompt } from "@shared/lib/types/app-settings";

export const [
  SettingsTemplatePromptFormProvider,
  useSettingsTemplatePromptFormContext,
  useSettingsTemplatePromptForm,
] = createFormContext<TemplatePrompt>();
