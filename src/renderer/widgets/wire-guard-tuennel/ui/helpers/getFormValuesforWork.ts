import {
  type SettingsFormValues,
  type StringValueWithKey,
} from "../../providers/ContextFormSettingsTunnel";

import { type StartTunnelSettingsPayload } from "@shared/lib/types/electron-api";

/**
 * Результат преобразования значений формы, исключающий поле `methodExcludeDomainsFromVpn`.
 */
type Result = Omit<StartTunnelSettingsPayload, "methodExcludeDomainsFromVpn">;

/**
 * Функция-маппер, которая извлекает и обрезает строковое значение из объекта с ключом.
 *
 * Удаляет лишние пробелы в начале и конце строки.
 *
 * @param {StringValueWithKey} param - Объект, содержащий строковое значение и ключ.
 * @param {string} param.value - Строковое значение для обработки.
 * @returns {string} Обрезанная строка.
 */
const mapRunction = ({ value }: StringValueWithKey) => value.trim();

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
    ...new Set(formValues.excludeFromVpn.map(mapRunction)),
  ];
  const siteInfoDnsServers = [
    ...new Set(formValues.siteInfoDnsServers.map(mapRunction)),
  ];
  const localNetworks: string[] = [
    ...new Set(formValues.localNetworks.map(mapRunction)),
  ];
  const onlyThisDomains = [
    ...new Set(formValues.onlyThisDomains.map(mapRunction)),
  ];

  return { excludeFromVpn, siteInfoDnsServers, localNetworks, onlyThisDomains };
};
