import { useEffect } from "react";
import { notifications } from "@mantine/notifications";

import { useRootStore } from "@renderer/providers/useRootStore";
import { useYaPlakalRuRootStore } from "@renderer/providers/ya-plakal/useYaplakalRootStore";

/**
 * Инициализация обработчиков событий от главного процесса
 */
export const useInitHandlers = () => {
  const {
    selectMaterialStore: { setWorking },
    pager: { setPagerValues },
    collection: { addMediaRecords, setUrlMediaRecord },
    setGroupSendFalse,
  } = useYaPlakalRuRootStore();

  const {
    mediaSendWatch: { setFileStatus },
  } = useRootStore();

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

    const unsubscribeFinishSendGroup =
      window.electronAPI.telegramBotSendGroupFinish(() => {
        setGroupSendFalse();
        notifications.show({ message: "Рассылка завершилась." });
      });

    const unsubscribeTelegramBotSendFileStatus =
      window.electronAPI.telegramBotSendFileStatus((payload) =>
        setFileStatus(payload),
      );

    // Функция очистки
    return () => {
      unsubscribeTopic();
      unsubscribeTopicMedia();
      unsubscribeError();
      unsubscribeFinishSendGroup();
      unsubscribeTelegramBotSendFileStatus();
    };
  }, []);
};
