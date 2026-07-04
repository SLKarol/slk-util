import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

import { useRootStore } from "@renderer/providers/useRootStore";

/**
 * Инициализация обработчиков событий от главного процесса
 */
export const useInitHandlers = () => {
  const navigate = useNavigate();
  const {
    trackerStihiStore: {
      setDateValue,
      startTracking,
      stopTracking,
      clearStatisticBotData,
      addStatisticBotData,
    },
  } = useRootStore();

  useEffect(() => {
    // Подписка на выбор пункта меню
    const unsubscribeMenu = window.electronAPI.onSelectMenu(
      (selectedUrl: string) => navigate(selectedUrl),
    );

    // Подписка на ошибки
    const unsubscribeError = window.electronAPI.onReceivePopErrorMessage(
      (errorMessage: string) => {
        notifications.show({
          title: "Ошибка",
          message: errorMessage,
          color: "red",
        });
      },
    );

    // Подписка на оповещения
    const unsubscribeMessage = window.electronAPI.onReceivePopMessage(
      (message: string) => {
        notifications.show({ title: "Оповещение", message });
      },
    );

    // Подписка на статус автосбора стихов
    const unsubscribeStatus = window.electronAPI.receiveStatusAutoReadStihi(
      ({ datePoems, isAutoRead }) => {
        if (isAutoRead) {
          startTracking();
          clearStatisticBotData();
          notifications.show({ message: "Запущен трекер обхода стихи.ру" });
        } else {
          stopTracking();
          notifications.show({ message: "Остановлен трекер обхода стихи.ру" });
        }
        setDateValue(datePoems);
      },
    );

    // Подписка на статистику бота
    const unsubscribeStatistic = window.electronAPI.onReceiveStatisticBot(
      (message) => {
        addStatisticBotData(message);
      },
    );

    /**
     * Подписка на событие окончания тг-рассылки
     */
    const unsubscribeSendGroupFinish =
      window.electronAPI.telegramBotSendGroupFinish(() => {
        notifications.show({ message: "Рассылка выполнена" });
      });

    // Функция отписки при размонтировании
    return () => {
      unsubscribeMenu();
      unsubscribeError();
      unsubscribeMessage();
      unsubscribeStatus();
      unsubscribeStatistic();
      unsubscribeSendGroupFinish();
    };
  }, [
    navigate,
    setDateValue,
    startTracking,
    stopTracking,
    clearStatisticBotData,
    addStatisticBotData,
  ]);
};
