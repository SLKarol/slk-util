import { Checkbox } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Компонент для отображения чекбокса для скрытия забаненных fdnjhjd.
 */
export const ListVerseCheckBan = observer(() => {
  const {
    stihiRuPoemsStore: { showBanned, toggleShowBanned },
  } = useStihiRuRootStore();
  return (
    <Checkbox
      checked={!showBanned}
      onChange={toggleShowBanned}
      label="Не показывать забаненных авторов"
    />
  );
});
ListVerseCheckBan.displayName = "ListVerseCheckBan";
