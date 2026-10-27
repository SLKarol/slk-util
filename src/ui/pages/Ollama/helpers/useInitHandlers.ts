import { useEffect } from "react";

import { useOllamaStore } from "@renderer/providers/ollama/";

/**
 * Инициализация обработчиков событий от главного процесса
 */
export const useInitHandlers = () => {
  const { processOllamaModelListResponse } = useOllamaStore();

  // Настроить обработчики событий запросов к сети
  useEffect(() => {
    window.electronAPI.listInstalledOllamaModels();

    const unsubscribeOnResponseListOllamaModels =
      window.electronAPI.processOllamaModelListResponse((listModels) => {
        processOllamaModelListResponse(listModels);
      });

    return () => {
      unsubscribeOnResponseListOllamaModels();
    };
  }, []);
};
