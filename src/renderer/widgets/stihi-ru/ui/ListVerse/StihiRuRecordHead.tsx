import { List } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { type SihiPoem } from "@renderer-features/stihi-ru/model/types";

interface Props {
  /**
   * Инфа о произведении
   */
  poem: SihiPoem;
}

/**
 * Список произведений / Название и прочая инфа
 */
export const StihiRuRecordHead = observer(({ poem }: Props) => {
  return <List.Item>{poem.title}</List.Item>;
});
StihiRuRecordHead.displayName = "StihiRuRecordHead";
