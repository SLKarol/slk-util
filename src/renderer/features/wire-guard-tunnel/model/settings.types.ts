/**
 * Ключи настроек
 */
enum WireGuardTunnelSettingsKeys {
  allowedIPs = "allowedIPs",
  excludeFromVpn = "excludeFromVpn",
  siteInfoDnsServers = "siteInfoDnsServers",
  onlyThisDomains = "onlyThisDomains",
}

/**
 * Пейлоад для записи настроек
 * ! delete
 */
export interface SetSettingOnKeyPayload {
  /**
   * Ключ
   */
  key: WireGuardTunnelSettingsKeys;
  /**
   * Значение
   */
  value: unknown;
}
