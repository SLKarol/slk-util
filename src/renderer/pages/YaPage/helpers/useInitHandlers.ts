import { useEffect } from "react";

import { useYaPlakalRuRootStore } from "@renderer/providers/ya-plakal/useYaplakalRootStore";

/**
 * Инициализация обработчиков событий от главного процесса
 */
export const useInitHandlers = () => {
  const {
    selectMaterialStore: { setWorking },
    pager: { setPagerValues },
    collection: { addMediaRecords, setUrlMediaRecord },
  } = useYaPlakalRuRootStore();

  // Настроить обработчики событий от главного процесса
  useEffect(() => {
    // Подписка на получение топика
    const unsubscribeTopic = window.electronAPI.receiveYaPlakalTopic(
      ({ mediaInfo, pages }) => {
        setPagerValues(pages);
        addMediaRecords(mediaInfo);
        setWorking(false);
      },
    );

    // Подписка на получение медиа для топика
    const unsubscribeTopicMedia = window.electronAPI.receiveYaPlakalTopicMedia(
      (yapTopicMedia) => {
        setUrlMediaRecord(yapTopicMedia);
      },
    );

    // Подписка на ошибку
    const unsubscribeError = window.electronAPI.onErrorMain(() => {
      setWorking(false);
    });

    // Функция очистки
    return () => {
      unsubscribeTopic();
      unsubscribeTopicMedia();
      unsubscribeError();
    };
  }, []);
};
