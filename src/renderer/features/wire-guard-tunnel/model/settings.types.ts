/**
 * Ключи настроек
 */
enum WireGuardTunnelSettingsKeys {
  allowedIPs = "allowedIPs",
  excludeFromVpn = "excludeFromVpn",
  siteInfoDnsServers = "siteInfoDnsServers",
}

/**
 * Пейлоад для записи настроек
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
