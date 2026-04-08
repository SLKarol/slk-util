import { useEffect } from "react";

import { useWireGuardTunnelRootStore } from "@renderer/providers/wire-guard-tunnel/useWireGuardTunnelRootStore";

/**
 * Инициализация обработчиков событий от главного процесса
 */
export const useInitHandlers = () => {
  const {
    settings: { setSettings },
  } = useWireGuardTunnelRootStore();

  // Настроить обработчики событий загрузки настроек
  useEffect(() => {
    window.electronAPI.fetchSettings();

    const unsubscribe = window.electronAPI.onReceiveSetting((settings) => {
      const {
        wireGuardTunnel = {
          allowedIPs: "",
          excludeFromVpn: [],
          siteInfoDnsServers: [],
        },
      } = settings;
      setSettings(wireGuardTunnel);
    });
    return unsubscribe;
  }, []);
};
