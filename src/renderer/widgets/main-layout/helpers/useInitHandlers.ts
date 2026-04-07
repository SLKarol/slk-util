import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router";

import { useRootStore } from "@renderer/providers/useRootStore";

/**
 * Инициализация обработчиков событий от главного процесса
 */
export const useInitHandlers = () => {
  const navigate = useNavigate();
  const {
    trackerStihiStore: { setDateValue, startTracking, stopTracking },
  } = useRootStore();

  useEffect(() => {
    const unsubscribe = window.electronAPI.onSelectMenu((selectedUrl: string) =>
      navigate(selectedUrl),
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = window.electronAPI.onReceivePopErrorMessage(
      (errorMessage: string) => {
        notifications.show({
          title: "Ошибка",
          message: errorMessage,
          color: "red",
        });
      },
    );
    return unsubscribe;
  }, []);
  useEffect(() => {
    const unsubscribe = window.electronAPI.onReceivePopMessage(
      (message: string) => {
        notifications.show({ title: "Оповещение", message });
      },
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = window.electronAPI.receiveStatusAutoReadStihi(
      ({ datePoems, isAutoRead }) => {
        if (isAutoRead) {
          startTracking();
          notifications.show({ message: "Запущен трекер обхода стихи.ру" });
        } else {
          stopTracking();
          notifications.show({ message: "Остановлен трекер обхода стихи.ру" });
        }
        setDateValue(datePoems);
      },
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = window.electronAPI.onReceiveStatisticBot((message) => {
      console.log(message);
    });
    return unsubscribe;
  }, []);
};
