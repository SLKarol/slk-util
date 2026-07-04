import { Outlet } from "react-router-dom";

import { YaPageTabs } from "@renderer/widgets/yaplakal/ui/tab-page/YaPageTabs";

import { useInitHandlers } from "./helpers/useInitHandlers";

/**
 * Странциа работы с Я.Плакал
 */
export const YaPage = () => {
  useInitHandlers();
  return (
    <>
      <YaPageTabs />
      <Outlet />
    </>
  );
};
