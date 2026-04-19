import { useEffect } from "react";

import { useYaPlakalRuRootStore } from "@renderer/providers/ya-plakal/useYaplakalRootStore";

/**
 * Инициализация обработчиков событий от главного процесса
 */
export const useInitHandlers = () => {
  const {
    selectMaterialStore: { setWorking },
  } = useYaPlakalRuRootStore();

  // Настроить обработчики событий запросов к сети
  useEffect(() => {
    const unsubscribe = window.electronAPI.receiveYaPlakalTopic((yapTopic) => {
      console.log("yapTopic :>> ", yapTopic);
      setWorking(false);
    });
    return unsubscribe;
  }, []);
};
