import { TextInput } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Ввести имя исполняемого файла
 */
export const InputBrowserProcess = observer(() => {
  const {
    stihiRuUiStore: { browserProcessName, setBrowserProcessName },
  } = useStihiRuRootStore();

  return (
    <TextInput
      label="Название исполняемого файла (например: firefox.exe)"
      value={browserProcessName ?? ""}
      onChange={(mouseEvent) => setBrowserProcessName(mouseEvent.target.value)}
      placeholder="Это должен быть броузер по умолчанию"
    />
  );
});
InputBrowserProcess.displayName = "InputBrowserProcess";
