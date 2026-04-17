import { useContext } from "react";

import { YaPlakalStateContext } from "./YaPlakalContext";
/**
 * Хук для обращения к стору от YaPlakal
 */
export const useYaPlakalRuRootStore = () => useContext(YaPlakalStateContext);
