import { TextInput } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useYaPlakalRuRootStore } from "@renderer/providers/ya-plakal/useYaplakalRootStore";

/**
 * Ввести адрес
 **/
export const InputUrl = observer(() => {
  const {
    selectMaterialStore: { setUrl, url },
  } = useYaPlakalRuRootStore();

  return (
    <TextInput
      label="Введите адрес"
      placeholder="https://www.yaplakal.com/forum[N]/topic[ID].html"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      flex={1}
    />
  );
});
InputUrl.displayName = "InputUrl";
