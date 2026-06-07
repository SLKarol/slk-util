import { observer } from "mobx-react-lite";
import { Outlet } from "react-router";

import { RedditPageTabs } from "@renderer/widgets/reddit/ui";

import { useInitHandlers } from "./helpers";

/**
 * Страница работы с Reddit
 */
export const RedditPage = observer(() => {
  useInitHandlers();
  return (
    <>
      <RedditPageTabs />
      <Outlet />
    </>
  );
});
RedditPage.displayName = "RedditPage";
