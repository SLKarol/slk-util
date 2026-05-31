import { Tabs } from "@mantine/core";
import { useNavigate, useParams } from "react-router";

import {
  MAP_ROUTE_PARAMS,
  REDDIT_TAB_PARAM_NAME,
} from "@pages/lib/routeConstants";

/**
 * Страница Reddit / Табы
 */
export const RedditPageTabs = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Tabs
      value={params[REDDIT_TAB_PARAM_NAME]}
      onChange={(value) => value && navigate(value)}
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
