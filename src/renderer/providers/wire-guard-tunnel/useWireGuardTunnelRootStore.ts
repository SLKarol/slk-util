import { useContext } from "react";

import { WireGuardTunnelContext } from "./WireGuardTunnelContext";
/**
 * Хук для обращения к стору WireGuardTunnel
 */
export const useWireGuardTunnelRootStore = () =>
  useContext(WireGuardTunnelContext);
