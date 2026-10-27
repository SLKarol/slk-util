import { createContext } from "react";

import { OllamaStore } from "@renderer-features/ollama/model/ollama";

/**
 * Контекст mobx стора ollama
 */
export const OllamaContext = createContext<OllamaStore>({} as OllamaStore);
