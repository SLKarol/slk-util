import { Outlet } from "react-router";

import { RedditPageTabs } from "@renderer/widgets/reddit/ui";

import { useInitHandlers } from "./helpers";

/**
 * Страница работы с Reddit
 */
export const RedditPage = () => {
  useInitHandlers();
  return (
    <>
      <RedditPageTabs />
      <Outlet />
    </>
  );
};
