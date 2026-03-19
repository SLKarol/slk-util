import { createContext } from "react";
import { StihiRuRootStore } from "@renderer-features/stihi-ru/model/stihi-ru-root-store";

/**
 * Контекст mobx стора stihi.ru
 */
export const StihiRuStateContext = createContext<StihiRuRootStore>(
  {} as StihiRuRootStore,
);
