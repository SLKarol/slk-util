import { useEffect } from "react";
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

  return <Outlet />;
};
