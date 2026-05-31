import { createContext } from "react";

import { RedditRootStore } from "@renderer-features/reddit/model";

/**
 * Контекст mobx стора Reddit
 */
export const RedditStateContext = createContext<RedditRootStore>(
  {} as RedditRootStore,
);
