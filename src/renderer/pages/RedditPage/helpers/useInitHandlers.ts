import { useEffect } from "react";

import { useRedditRootStore } from "@renderer/providers/reddit";
import { useRootStore } from "@renderer/providers/useRootStore";

/**
 * Инициализация обработчиков событий от главного процесса
 */
export const useInitHandlers = () => {
  const {
    redditSubscribeStore: { setWorking, saveSubscribes },
    redditResponseNewRecords,
    redditCollection: { redditResponseCollection, updateMediaPreview },
    setGroupSendFalse,
  } = useRedditRootStore();

  const {
    holidaysStore: { loadHolydays },
    mediaSendWatch: { setFileStatus },
  } = useRootStore();

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
        redditResponseCollection(redditCollectionPayload);
      });

    const unsubscribeRedditResponsePreview =
      window.electronAPI.redditResponsePreview((redditResponsePreview) => {
        updateMediaPreview(redditResponsePreview);
      });

    window.electronAPI.receiveNamesOfHolidays();
    const unsubscribeResponseNamesOfHolidays =
      window.electronAPI.responseNamesOfHolidays((response) => {
        loadHolydays(response);
      });

    /** Сообщения из реддита отправлены */
    const unsubscribeFinishSendGroup =
      window.electronAPI.telegramBotSendGroupFinish(() => {
        setGroupSendFalse();
      });

    const unsubscribeTelegramBotSendFileStatus =
      window.electronAPI.telegramBotSendFileStatus((payload) =>
        setFileStatus(payload),
      );

    // Функция очистки
    return () => {
      unsubscribeMyReddits();
      unsubscribeRedditResponseNewRecords();
      unsubscribeRedditResponseCollection();
      unsubscribeRedditResponsePreview();
      unsubscribeResponseNamesOfHolidays();
      unsubscribeFinishSendGroup();
      unsubscribeTelegramBotSendFileStatus();
    };
  }, []);
};
