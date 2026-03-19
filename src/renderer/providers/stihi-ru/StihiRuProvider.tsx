import { type FC, type PropsWithChildren, useMemo } from "react";
import { StihiRuRootStore } from "@renderer-features/stihi-ru/model/stihi-ru-root-store";

import { StihiRuStateContext } from "./StihiRuContext";

/**
 * mobx стор stihi.ru
 */
const stihiRuRootStore = new StihiRuRootStore();

/**
 * Провайдер mobx стора stihi.ru
 */
export const StihiRuRootProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const valueContext = useMemo(() => stihiRuRootStore, []);

  return (
    <StihiRuStateContext.Provider value={valueContext}>
      {children}
    </StihiRuStateContext.Provider>
  );
};
