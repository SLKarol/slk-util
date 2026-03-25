import { Checkbox } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Компонент для отображения чекбокса для скрытия забаненных fdnjhjd.
 */
export const ListVerseCheckBan = observer(() => {
  const {
    stihiRuPoemsStore: { hasPoems, showBanned, toggleShowBanned },
  } = useStihiRuRootStore();
  if (hasPoems)
    return (
      <Checkbox
        checked={!showBanned}
        onChange={toggleShowBanned}
        label="Не показывать забаненных авторов"
      />
    );

  return null;
});
ListVerseCheckBan.displayName = "ListVerseCheckBan";
