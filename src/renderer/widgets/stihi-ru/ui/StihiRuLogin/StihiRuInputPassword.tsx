import { PasswordInput } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Инпут ввода пароля
 */
export const StihiRuInputPassword = observer(() => {
  const {
    stihiRuLoginStore: {
      settings: { password },
      setSettingsProp,
    },
  } = useStihiRuRootStore();

  return (
    <PasswordInput
      label="Пароль"
      required
      radius="md"
      onChange={(eventInput) =>
        setSettingsProp("password", eventInput.currentTarget.value)
      }
      value={password}
    />
  );
});

StihiRuInputPassword.displayName = "StihiRuInputPassword";
