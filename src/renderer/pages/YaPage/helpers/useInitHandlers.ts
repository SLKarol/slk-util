import { useEffect } from "react";

import { parseStringToHTML } from "@shared/lib/helpers/parseStringToHTML";
import { type ReceiveText } from "@shared/lib/types/electron-api";

import { useYaPlakalRuRootStore } from "@renderer/providers/ya-plakal/useYaplakalRootStore";
import { checkUrlTopic } from "@renderer/widgets/yaplakal/lib/helpers/checkUrlTopic";

/**
 * Инициализация обработчиков событий от главного процесса
 */
export const useInitHandlers = () => {
  const {
    selectMaterialStore: { setWorking },
  } = useYaPlakalRuRootStore();

  // Настроить обработчики событий запросов к сети
  useEffect(() => {
    const unsubscribe = window.electronAPI.onReceiveText(
      ({ requestParam, textContent }: ReceiveText) => {
        if (checkUrlTopic(requestParam as string)) {
          const downloadDoc = parseStringToHTML(textContent);
          setWorking(false);
        }
      },
    );
    return unsubscribe;
  }, []);
};
