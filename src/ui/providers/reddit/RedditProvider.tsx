import { type FC, type PropsWithChildren, useMemo } from "react";

import { RedditRootStore } from "@renderer-features/reddit/model";

import { RedditStateContext } from "./RedditContext";

/**
 * Провайдер mobx стора reddit
 */
export const RedditProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const valueContext = useMemo(() => {
    /**
     * mobx стор reddit
     */
    const redditRootStore = new RedditRootStore();
    return redditRootStore;
  }, []);

  return (
    <RedditStateContext.Provider value={valueContext}>
      {children}
    </RedditStateContext.Provider>
  );
};
