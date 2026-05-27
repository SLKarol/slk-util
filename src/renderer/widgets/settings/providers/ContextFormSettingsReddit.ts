import { createFormContext } from "@mantine/form";

import { type AppSettingsReddit } from "@shared/lib/types/app-settings";

export const [
  SettingsRedditFormProvider,
  useSettingsRedditFormContext,
  useSettingsRedditForm,
] = createFormContext<AppSettingsReddit>();
