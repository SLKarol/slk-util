import { createFormContext } from "@mantine/form";

import { type StringValueWithKey } from "@renderer/widgets/lib/types";

/**
 * Интерфейс, определяющий структуру значений формы настроек.
 */
export interface SettingsFormValues {
  /** Список DNS-серверов */
  siteInfoDnsServers: StringValueWithKey[];
  /** Список адресов или доменов, исключённые из использования VPN */
  excludeFromVpn: StringValueWithKey[];
  /** Список определения локальных сетей */
  localNetworks: StringValueWithKey[];
  /** Список доменов, которые используют VPN */
  onlyThisDomains: StringValueWithKey[];
  /** Флаг, указывающий, что метод исключения доменов из VPN активирован. */
  methodExcludeDomainsFromVpn: boolean;
}

// You can give context variables any name
export const [SettingsFormProvider, useSettingsFormContext, useSettingsForm] =
  createFormContext<SettingsFormValues>();
