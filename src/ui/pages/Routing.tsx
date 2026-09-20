import { MemoryRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "@pages/Home/HomePage";
import { StihiRu } from "@pages/StihiRu/StihiRu";

import { MainLayout } from "@widgets/main-layout/ui/MainLayout";

import { RedditProvider } from "@renderer/providers/reddit";
import { RootStoreProvider } from "@renderer/providers/RootStoreProvider";
import { StihiRuRootProvider } from "@renderer/providers/stihi-ru/StihiRuProvider";
import { WireGuardTunnelRootProvider } from "@renderer/providers/wire-guard-tunnel/WireGuardTunnelProvider";
import { YaPlakalProvider } from "@renderer/providers/ya-plakal/YaPlakalProvider";

import {
  REDDIT_TAB_PARAM_NAME,
  YAPLAKAL_TAB_PARAM_NAME,
} from "./lib/routeConstants";
import { RedditPage, RedditPageCurrentTab } from "./RedditPage";
import { SettingSelected, SettingsPage } from "./Settings";
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
          <Route path="settings" element={<SettingsPage />}>
            <Route path=":setting" element={<SettingSelected />} />
          </Route>
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
          <Route
            path="reddit"
            element={
              <RedditProvider>
                <RedditPage />
              </RedditProvider>
            }
          >
            <Route
              path={`:${REDDIT_TAB_PARAM_NAME}`}
              element={<RedditPageCurrentTab />}
            />
          </Route>
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
