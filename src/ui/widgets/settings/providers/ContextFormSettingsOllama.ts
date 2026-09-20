import { createFormContext } from "@mantine/form";

import { type AppSettingsOllama } from "@shared/lib/types/app-settings";

export const [
  SettingsOllamaFormProvider,
  useSettingsOllamaFormContext,
  useSettingsOllamaForm,
] = createFormContext<AppSettingsOllama>();
