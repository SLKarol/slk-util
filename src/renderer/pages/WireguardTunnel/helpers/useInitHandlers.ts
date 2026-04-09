import { useEffect } from "react";
import { notifications } from "@mantine/notifications";

import { useWireGuardTunnelRootStore } from "@renderer/providers/wire-guard-tunnel/useWireGuardTunnelRootStore";

/**
 * Инициализация обработчиков событий от главного процесса
 */
export const useInitHandlers = () => {
  const {
    settings: { setSettings },
    status: { setIdle },
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

  useEffect(() => {
    const unsubscribe = window.electronAPI.receiveStopTunnelSettins(() => {
      setIdle();
      notifications.show({
        message: "Процесс настройки закончился",
      });
    });

    return unsubscribe;
  }, []);
};
