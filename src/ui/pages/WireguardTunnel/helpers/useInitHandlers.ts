import { useEffect } from "react";

import { useWireGuardTunnelRootStore } from "@renderer/providers/wire-guard-tunnel/useWireGuardTunnelRootStore";

/**
 * Инициализация обработчиков событий от главного процесса
 */
export const useInitHandlers = () => {
  const {
    status: { setIdle },
  } = useWireGuardTunnelRootStore();

  useEffect(() => {
    const unsubscribe = window.electronAPI.receiveStopTunnelSettins(() => {
      setIdle();
    });

    return unsubscribe;
  }, []);
};
