import { useEffect } from "react";

import { useOllamaStore } from "@renderer/providers/ollama/";

/**
 * Инициализация обработчиков событий от главного процесса
 */
export const useInitHandlers = () => {
  const {
    processOllamaModelListResponse,
    ollamaUpdateLogs: { processIncomingLog, stopUpdating },
  } = useOllamaStore();

  // Настроить обработчики событий запросов к сети
  useEffect(() => {
    window.electronAPI.listInstalledOllamaModels();

    const unsubscribeOnResponseListOllamaModels =
      window.electronAPI.processOllamaModelListResponse((listModels) => {
        processOllamaModelListResponse(listModels);
      });

    const unsubscribeOnOllamaUpdateModelsProgress =
      window.electronAPI.ollamaUpdateModelsProgress((progress) => {
        processIncomingLog(progress);
      });

    const unsubscribeOnOllamaUpdateModelsComplete =
      window.electronAPI.ollamaUpdateModelsComplete(() => {
        stopUpdating();
      });

    return () => {
      unsubscribeOnResponseListOllamaModels();
      unsubscribeOnOllamaUpdateModelsProgress();
      unsubscribeOnOllamaUpdateModelsComplete();
    };
  }, []);
};
