import { Tabs } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";

import {
  MAP_ROUTE_PARAMS,
  YAPLAKAL_TAB_PARAM_NAME,
} from "@pages/lib/routeConstants";

/**
 * Страница ЯПЛАКАЛ / Табы
 */
export const YaPageTabs = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Tabs
      value={params[YAPLAKAL_TAB_PARAM_NAME]}
      onChange={(value) => navigate(`${value}`)}
    >
      <Tabs.List>
        {Array.from(MAP_ROUTE_PARAMS.entries()).map(
          ([routeKey, routeCaption]) => (
            <Tabs.Tab key={routeKey} value={routeKey}>
              {routeCaption}
            </Tabs.Tab>
          ),
        )}
      </Tabs.List>
    </Tabs>
  );
};
