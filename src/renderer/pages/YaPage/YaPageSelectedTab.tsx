import { useParams } from "react-router";

import { YAPLAKAL_TAB_PARAM_NAME } from "@pages/lib/routeConstants";

/**
 * Маршрут выбранной вкладки.
 */
export const YaPageSelectedTab = () => {
  const params = useParams();
  return <div>{params[YAPLAKAL_TAB_PARAM_NAME]}</div>;
};
