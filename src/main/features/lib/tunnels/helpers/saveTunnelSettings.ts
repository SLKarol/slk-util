import { UserDataFileManager } from "@main/features/UserDataFileManager";
import { SETTINGS_APP } from "@main/shared/lib/constants";

import { type AppSettings } from "@shared/lib/types/app-settings";
import { AppSettingsWireGuardTunnelWithoutAllowedIPs } from "@shared/lib/types/electron-api";

/**
 * Сохраняет настройки туннеля в хранилище приложения.
 *
 * Функция извлекает указанные параметры и сохраняет их в конфигурацию приложения,
 * чтобы они могли быть использованы позже при создании туннелей.
 */
export const saveTunnelSettings = async ({
  excludeFromVpn,
  siteInfoDnsServers,
  localNetworks,
  onlyThisDomains,
}: AppSettingsWireGuardTunnelWithoutAllowedIPs) => {
  // Инициализируем менеджер для работы с файлом настроек приложения
  const settingsFile = new UserDataFileManager<AppSettings>(
    "settings.json",
    SETTINGS_APP,
  );

  // Сохраняем пришедшие настройки WireGuard туннеля в файл настроек приложения
  const oldSettings = await settingsFile.readData();
  return await settingsFile.writeData({
    ...oldSettings,
    wireGuardTunnel: {
      allowedIPs: "",
      excludeFromVpn,
      siteInfoDnsServers,
      localNetworks,
      onlyThisDomains,
    },
  });
};
