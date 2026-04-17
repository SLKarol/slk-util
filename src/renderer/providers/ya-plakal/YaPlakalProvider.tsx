import { type FC, type PropsWithChildren, useMemo } from "react";

import { YaPlakalRootStore } from "@renderer-features/ya-plakal/model/ya-plakal-root-store";

import { YaPlakalStateContext } from "./YaPlakalContext";

/**
 * mobx стор ya-plakal
 */
const yaPlakalRootStore = new YaPlakalRootStore();

/**
 * Провайдер mobx стора ya-plakal
 */
export const YaPlakalProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const valueContext = useMemo(() => yaPlakalRootStore, []);

  return (
    <YaPlakalStateContext.Provider value={valueContext}>
      {children}
    </YaPlakalStateContext.Provider>
  );
};
