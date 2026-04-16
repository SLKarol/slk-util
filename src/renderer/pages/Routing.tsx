import { MemoryRouter, Route, Routes } from "react-router";

import { HomePage } from "@pages/Home/HomePage";
import { StihiRu } from "@pages/StihiRu/StihiRu";

import { MainLayout } from "@widgets/main-layout/ui/MainLayout";

import { RootStoreProvider } from "@renderer/providers/RootStoreProvider";
import { StihiRuRootProvider } from "@renderer/providers/stihi-ru/StihiRuProvider";
import { WireGuardTunnelRootProvider } from "@renderer/providers/wire-guard-tunnel/WireGuardTunnelProvider";

import { SettingsTgBot } from "./SettingsTgBot/SettingsTgBot";
import { WireguardTunnel } from "./WireguardTunnel/WireguardTunnel";

export const Routing = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route
          element={
            <RootStoreProvider>
              <MainLayout />
            </RootStoreProvider>
          }
        >
          <Route index element={<HomePage />} />
          <Route
            path="stihiru"
            element={
              <StihiRuRootProvider>
                <StihiRu />
              </StihiRuRootProvider>
            }
          />
          <Route
            path="wireguardtunnel"
            element={
              <WireGuardTunnelRootProvider>
                <WireguardTunnel />
              </WireGuardTunnelRootProvider>
            }
          />
          <Route path="settingstgbot" element={<SettingsTgBot />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
