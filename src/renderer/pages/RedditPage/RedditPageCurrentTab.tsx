import { Container } from "@mantine/core";
import { useParams } from "react-router-dom";

import { REDDIT_TAB_PARAM_NAME } from "@pages/lib/routeConstants";

import { RedditPost } from "./RedditPost";
import { RedditSelectMaterials } from "./RedditSelectMaterials";

/**
 * Маршрут выбранной вкладки.
 */
export const RedditPageCurrentTab = () => {
  const params = useParams();
  return (
    <Container size="lg" pb="1rem" pt="1rem">
      {params[REDDIT_TAB_PARAM_NAME] === "select" && <RedditSelectMaterials />}
      {params[REDDIT_TAB_PARAM_NAME] === "post" && <RedditPost />}
    </Container>
  );
};
