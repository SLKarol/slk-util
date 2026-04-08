import { createContext } from "react";

import { WireGuardTunnelRootStore } from "@renderer-features/wire-guard-tunnel/model/root-store";

/**
 * Контекст mobx стора WireGuardTunnel
 */
export const WireGuardTunnelContext = createContext<WireGuardTunnelRootStore>(
  {} as WireGuardTunnelRootStore,
);
