import { type AppSettings } from "@shared/lib/types/app-settings";

/**
 * Параметры для записи настроек.
 */
export interface WriteSettingsProps {
  /**
   * Данные настроек, которые нужно сохранить.
   */
  settings: unknown;
  /**
   * Ключ, под которым будут сохранены настройки (например, 'stihiRu').
   */
  key: keyof AppSettings;
}
