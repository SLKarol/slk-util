import { Title } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useRedditRootStore } from "@renderer/providers/reddit";

/**
 * Количество выбранных материалов
 */
export const RedditCountSelected = observer(() => {
  const {
    itemsToSend: { countSelected },
  } = useRedditRootStore();

  return <Title order={5}>{`Выбрано для отправки : ${countSelected}`}</Title>;
});
RedditCountSelected.displayName = "RedditCountSelected";
