import { useContext } from "react";

import { OllamaContext } from "./OllamaContext";
/**
 * Хук для обращения к стору от stihi-ru
 */
export const useOllamaStore = () => useContext(OllamaContext);
