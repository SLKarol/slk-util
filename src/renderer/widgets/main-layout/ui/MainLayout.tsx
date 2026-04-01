import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { Outlet, useNavigate } from "react-router";

/**
 * Разметка главной страницы.
 * Здесь же обработчики выбора меню.
 */
export const MainLayout = () => {
  const navigate = useNavigate();
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

  return <Outlet />;
};
