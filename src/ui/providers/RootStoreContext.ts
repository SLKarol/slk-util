import { createContext } from "react";

import { RootStore } from "@renderer-features/model/root-store";

/**
 * Контекст mobx стора для всего приложения
 */
export const RootStateContext = createContext<RootStore>({} as RootStore);
