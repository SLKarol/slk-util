import { Text } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Вывод даты окончания токена
 */
export const StihiRuLoginDateExpires = observer(() => {
  const {
    stihiRuLoginStore: { tokenExpiration },
  } = useStihiRuRootStore();
  if (!tokenExpiration) return <Text />;

  return <Text>{`Токен действует до: ${tokenExpiration}`}</Text>;
});
StihiRuLoginDateExpires.displayName = "StihiRuLoginDateExpires";
