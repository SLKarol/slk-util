import { TextInput } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Инпут ввода логина
 */
export const StihiRuInputLogin = observer(() => {
  const {
    stihiRuLoginStore: {
      settings: { login },
      setSettingsProp,
    },
  } = useStihiRuRootStore();

  return (
    <TextInput
      label="Логин"
      required
      radius="md"
      onChange={(eventInput) =>
        setSettingsProp("login", eventInput.currentTarget.value)
      }
      value={login}
    />
  );
});

StihiRuInputLogin.displayName = "StihiRuInputLogin";
