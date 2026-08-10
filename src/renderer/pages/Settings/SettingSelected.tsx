import { useParams } from "react-router-dom";
import { match } from "ts-pattern";

import {
  SETTINGS_CACHE,
  SETTINGS_DOWNLOADS,
  SETTINGS_OLLAMA,
  SETTINGS_PROMPT,
  SETTINGS_REDDIT,
  SETTINGS_SELECTOR_YAP,
  SETTINGS_TD_BOT,
  SETTINGS_TEMPLATE_HOLIDAY,
} from "@renderer/widgets/settings/lib/constants";

import { SettingsCacheDir } from "./SettingsCacheDir";
import { SettingsFolderForSaveFiles } from "./SettingsFolderForSaveFiles";
import { SettingsOllama } from "./SettingsOllama";
import { SettingsReddit } from "./SettingsReddit";
import { SettingsSelectorYap } from "./SettingsSelectorYap";
import { SettingsTemplateHoliday } from "./SettingsTemplateHoliday";
import { SettingsTgBot } from "./SettingsTgBot";

/**
 * Настройка / Выбранный раздел
 */
export const SettingSelected = () => {
  const { setting = "" } = useParams();

  return match(setting)
    .with(SETTINGS_TD_BOT, () => <SettingsTgBot />)
    .with(SETTINGS_DOWNLOADS, () => <SettingsFolderForSaveFiles />)
    .with(SETTINGS_CACHE, () => <SettingsCacheDir />)
    .with(SETTINGS_SELECTOR_YAP, () => <SettingsSelectorYap />)
    .with(SETTINGS_REDDIT, () => <SettingsReddit />)
    .with(SETTINGS_TEMPLATE_HOLIDAY, () => <SettingsTemplateHoliday />)
    .with(SETTINGS_OLLAMA, () => <SettingsOllama />)
    .with(SETTINGS_PROMPT, () => null)
    .otherwise(() => <div>Unknown setting: {setting}</div>);
};
