import { Outlet } from "react-router";

import { useInitHandlers } from "../helpers/useInitHandlers";

/**
 * Разметка главной страницы.
 * Здесь же обработчики выбора меню.
 */
export const MainLayout = () => {
  useInitHandlers();

  return <Outlet />;
};
