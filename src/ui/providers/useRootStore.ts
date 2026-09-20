import { useContext } from "react";

import { RootStateContext } from "./RootStoreContext";
/**
 * Хук для обращения к стору приложения
 */
export const useRootStore = () => useContext(RootStateContext);
