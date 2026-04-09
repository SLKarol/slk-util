import { createFormContext } from "@mantine/form";

/**
 * Интерфейс, представляющий строковое значение с ключом.
 * Используется для хранения пар "ключ-значение", где оба поля являются строками.
 *
 * @property {string} value - Значение строки.
 * @property {string} key - Ключ, ассоциированный со значением.
 */
export interface StringValueWithKey {
  value: string;
  key: string;
}

/**
 * Интерфейс, определяющий структуру значений формы настроек.
 *
 * @property {StringValueWithKey[]} siteInfoDnsServers - Список DNS-серверов.
 * @property {string[]} excludeFromVpn - Список адресов или доменов, исключённые из использования VPN.
 */
interface SettingsFormValues {
  siteInfoDnsServers: StringValueWithKey[];
  excludeFromVpn: string[];
}

// You can give context variables any name
export const [SettingsFormProvider, useSettingsFormContext, useSettingsForm] =
  createFormContext<SettingsFormValues>();
