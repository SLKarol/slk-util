import { type FC, type PropsWithChildren, useMemo } from "react";

import { RootStore } from "@renderer-features/model/root-store";

import { RootStateContext } from "./RootStoreContext";

/**
 * mobx стор для приложения
 */
const rootStore = new RootStore();

/**
 * Провайдер mobx стора для приложения
 */
export const RootStoreProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const valueContext = useMemo(() => rootStore, []);

  return (
    <RootStateContext.Provider value={valueContext}>
      {children}
    </RootStateContext.Provider>
  );
};
