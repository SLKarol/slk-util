import { useContext } from "react";

import { StihiRuStateContext } from "./StihiRuContext";
/**
 * Хук для обращения к стору от stihi-ru
 */
export const useStihiRuRootStore = () => useContext(StihiRuStateContext);
