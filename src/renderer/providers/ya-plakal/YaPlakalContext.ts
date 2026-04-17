import { createContext } from "react";

import { YaPlakalRootStore } from "@renderer-features/ya-plakal/model/ya-plakal-root-store";

/**
 * Контекст mobx стора YaPlakal
 */
export const YaPlakalStateContext = createContext<YaPlakalRootStore>(
  {} as YaPlakalRootStore,
);
