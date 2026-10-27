import { type FC, type PropsWithChildren, useMemo } from "react";

import { OllamaStore } from "@renderer-features/ollama/model/ollama";

import { OllamaContext } from "./OllamaContext";

/**
 * mobx стор stihi.ru
 */
const ollamaStore = new OllamaStore();

/**
 * Провайдер mobx стора stihi.ru
 */
export const OllamaStoreProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const valueContext = useMemo(() => ollamaStore, []);

  return (
    <OllamaContext.Provider value={valueContext}>
      {children}
    </OllamaContext.Provider>
  );
};
