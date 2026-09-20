import { type SettingsFormValues } from "../../providers/ContextFormSettingsTunnel";

import { type StartTunnelSettingsPayload } from "@shared/lib/types/electron-api";

import { mapObjectValue } from "@renderer/widgets/lib/helpers";

/**
 * Результат преобразования значений формы, исключающий поле `methodExcludeDomainsFromVpn`.
 */
type Result = Omit<StartTunnelSettingsPayload, "methodExcludeDomainsFromVpn">;

/**
 * Преобразует значения формы настроек туннеля в формат, пригодный для использования в работе приложения.
 *
 * Функция очищает и нормализует массивы доменов и сетей, удаляя дубликаты и лишние пробелы.
 * Поддерживаемые поля: исключение из VPN, DNS-серверы, локальные сети, разрешённые домены.
 *
 * @returns {Result} Объект с подготовленными значениями, готовыми к передаче в API туннеля.
 */
export const getFormValuesforWork = (
  formValues: SettingsFormValues,
): Result => {
  const excludeFromVpn = [
    ...new Set(formValues.excludeFromVpn.map(mapObjectValue)),
  ];
  const siteInfoDnsServers = [
    ...new Set(formValues.siteInfoDnsServers.map(mapObjectValue)),
  ];
  const localNetworks: string[] = [
    ...new Set(formValues.localNetworks.map(mapObjectValue)),
  ];
  const onlyThisDomains = [
    ...new Set(formValues.onlyThisDomains.map(mapObjectValue)),
  ];

  return { excludeFromVpn, siteInfoDnsServers, localNetworks, onlyThisDomains };
};
