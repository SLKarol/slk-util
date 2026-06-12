import { useEffect } from "react";

import { useRedditRootStore } from "@renderer/providers/reddit";

/**
 * Инициализация обработчиков событий от главного процесса
 */
export const useInitHandlers = () => {
  const {
    redditSubscribeStore: { setWorking, saveSubscribes },
    redditResponseNewRecords,
  } = useRedditRootStore();

  // Настроить обработчики событий от главного процесса
  useEffect(() => {
    // Запрос моих reddit-подписок
    setWorking(true);
    window.electronAPI.redditReceiveMyReddits();

    // Подписка на получение моих подписок
    const unsubscribeMyReddits = window.electronAPI.redditResponseMyReddits(
      (responseMyReddits) => {
        saveSubscribes(responseMyReddits);
        setWorking(false);
      },
    );

    const unsubscribeRedditResponseNewRecords =
      window.electronAPI.redditResponseNewRecords((responseMyReddits) => {
        redditResponseNewRecords(responseMyReddits);
      });

    const unsubscribeRedditResponseCollection =
      window.electronAPI.redditResponseCollection((redditCollectionPayload) => {
        console.log(redditCollectionPayload);
      });

    const unsubscribeRedditResponsePreview =
      window.electronAPI.redditResponsePreview((redditResponsePreview) => {
        console.log(redditResponsePreview);
      });

    // Функция очистки
    return () => {
      unsubscribeMyReddits();
      unsubscribeRedditResponseNewRecords();
      unsubscribeRedditResponseCollection();
      unsubscribeRedditResponsePreview();
    };
  }, []);
};
