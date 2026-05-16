import { MemoryRouter, Route, Routes } from "react-router";

import { HomePage } from "@pages/Home/HomePage";
import { StihiRu } from "@pages/StihiRu/StihiRu";

import { MainLayout } from "@widgets/main-layout/ui/MainLayout";

import { RootStoreProvider } from "@renderer/providers/RootStoreProvider";
import { StihiRuRootProvider } from "@renderer/providers/stihi-ru/StihiRuProvider";
import { WireGuardTunnelRootProvider } from "@renderer/providers/wire-guard-tunnel/WireGuardTunnelProvider";
import { YaPlakalProvider } from "@renderer/providers/ya-plakal/YaPlakalProvider";

import { CacheDir } from "./CacheDir";
import { YAPLAKAL_TAB_PARAM_NAME } from "./lib/routeConstants";
import { SettingsFolderForSaveFiles } from "./SettingsFolderForSaveFiles/SettingsFolderForSaveFiles";
import { SettingsTgBot } from "./SettingsTgBot/SettingsTgBot";
import { WireguardTunnel } from "./WireguardTunnel/WireguardTunnel";
import { YaPage } from "./YaPage/YaPage";
import { YaPageCurrentTab } from "./YaPage/YaPageCurrentTab";

/**
 * Настройка роутинга
 */
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
          <Route
            path="settingsDownloads"
            element={<SettingsFolderForSaveFiles />}
          />
          <Route path="cacheDir" element={<CacheDir />} />
          <Route
            path="yaplakal"
            element={
              <YaPlakalProvider>
                <YaPage />
              </YaPlakalProvider>
            }
          >
            <Route
              path={`:${YAPLAKAL_TAB_PARAM_NAME}`}
              element={<YaPageCurrentTab />}
            />
          </Route>
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
