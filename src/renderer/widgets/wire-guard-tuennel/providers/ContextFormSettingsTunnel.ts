import { createFormContext } from "@mantine/form";

/**
 * Интерфейс, представляющий строковое значение с ключом.
 * Используется для хранения пар "ключ-значение", где оба поля являются строками.
 */
export interface StringValueWithKey {
  /** Значение строки */
  value: string;
  /** Ключ, ассоциированный со значением */
  key: string;
}

/**
 * Интерфейс, определяющий структуру значений формы настроек.
 */
export interface SettingsFormValues {
  /** Список DNS-серверов */
  siteInfoDnsServers: StringValueWithKey[];
  /** Список адресов или доменов, исключённые из использования VPN */
  excludeFromVpn: StringValueWithKey[];
}

// You can give context variables any name
export const [SettingsFormProvider, useSettingsFormContext, useSettingsForm] =
  createFormContext<SettingsFormValues>();
