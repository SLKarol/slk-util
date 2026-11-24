import { observer } from "mobx-react-lite";
import { IconBan } from "@tabler/icons-react";
import { ActionIcon, Tooltip } from "@mantine/core";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Кнопка отправки в бан всех видимых Поэтов в списке
 */
export const ButtonBanAllVisible = observer(() => {
  const {
    stihiRuPoemsStore: { invites, newPoems },
    banAllVisibleAuthors,
  } = useStihiRuRootStore();

  return (
    <Tooltip label="Отправить в бан всех видимых Поэтов в списке">
      <ActionIcon
        variant="filled"
        disabled={newPoems.length === 0 || invites.length === 0}
        onClick={banAllVisibleAuthors}
      >
        <IconBan />
      </ActionIcon>
    </Tooltip>
  );
});
ButtonBanAllVisible.displayName = "ButtonBanAllVisible";
