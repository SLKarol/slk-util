import { Container } from "@mantine/core";
import { useParams } from "react-router";

import { YAPLAKAL_TAB_PARAM_NAME } from "@pages/lib/routeConstants";

import { YaPost } from "./YaPost";
import { YaSelectMaterials } from "./YaSelectMaterials";

/**
 * Маршрут выбранной вкладки.
 */
export const YaPageCurrentTab = () => {
  const params = useParams();
  return (
    <Container size="lg" pb="1rem" pt="1rem">
      {params[YAPLAKAL_TAB_PARAM_NAME] === "select" && <YaSelectMaterials />}
      {params[YAPLAKAL_TAB_PARAM_NAME] === "post" && <YaPost />}
    </Container>
  );
};
