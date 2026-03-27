import { Checkbox } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Чекбокс включения приглашений в списке произведений и их загрузка
 */
export const CheckBoxIncludeInvite = observer(() => {
  const {
    stihiRuUiStore: { openWithInvite, toggleOpenWithInvite },
  } = useStihiRuRootStore();
  return <Checkbox checked={openWithInvite} onChange={toggleOpenWithInvite} />;
});
CheckBoxIncludeInvite.displayName = "CheckBoxIncludeInvite";
