import { type FC, type PropsWithChildren, useMemo } from "react";

import { WireGuardTunnelRootStore } from "@renderer-features/wire-guard-tunnel/root-store";

import { WireGuardTunnelContext } from "./WireGuardTunnelContext";

/**
 * mobx стор WireGuardTunnel
 */
const wireGuardTunnelRootStore = new WireGuardTunnelRootStore();

/**
 * Провайдер mobx стора WireGuardTunnel
 */
export const WireGuardTunnelRootProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const valueContext = useMemo(() => wireGuardTunnelRootStore, []);

  return (
    <WireGuardTunnelContext.Provider value={valueContext}>
      {children}
    </WireGuardTunnelContext.Provider>
  );
};
