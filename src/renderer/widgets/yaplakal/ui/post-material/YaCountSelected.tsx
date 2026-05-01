import { Title } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useYaPlakalRuRootStore } from "@renderer/providers/ya-plakal/useYaplakalRootStore";

/**
 * Количество выбранных материалов
 */
export const YaCountSelected = observer(() => {
  const {
    itemsToSend: { countSelected },
  } = useYaPlakalRuRootStore();
  return <Title order={5}>{`Выбрано для отправки : ${countSelected}`}</Title>;
});
