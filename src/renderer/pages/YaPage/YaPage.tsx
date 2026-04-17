import { Outlet } from "react-router";

import { YaPageTabs } from "@renderer/widgets/yaplakal/ui/tab-page/YaPageTabs";

/**
 * Странциа работы с Я.Плакал
 */
export const YaPage = () => {
  return (
    <>
      <YaPageTabs />
      <Outlet />
    </>
  );
};
