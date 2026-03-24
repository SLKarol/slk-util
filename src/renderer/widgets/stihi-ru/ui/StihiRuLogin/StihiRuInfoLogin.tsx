import { Text } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Компонент отображения информационного сообщения о состоянии авторизации на stihi.ru.
 *
 * @remarks
 * Показывает одно из двух сообщений в зависимости от того, авторизован ли пользователь:
 * - Если залогинен — напоминает об этом.
 * - Если не залогинен — объясняет, зачем нужна авторизация.
 * Использует MobX для реактивного обновления при изменении состояния входа.
 */
export const StihiRuInfoLogin = observer(() => {
  const {
    stihiRuLoginStore: { isLoggedIn },
  } = useStihiRuRootStore();

  if (isLoggedIn)
    return <Text>Вы уже залогинились, ничего делать не надо.</Text>;

  return <Text>Залогинившиеся юзеры имеют возможность оставлять следы.</Text>;
});
StihiRuInfoLogin.displayName = "StihiRuInfoLogin";
