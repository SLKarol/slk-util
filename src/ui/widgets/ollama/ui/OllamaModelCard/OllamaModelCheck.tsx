import { observer } from "mobx-react-lite";
import { Checkbox, MantineProvider, type MantineTheme } from "@mantine/core";

import { useOllamaStore } from "@renderer/providers/ollama";

type Props = {
  /**
   * Тема
   */
  theme: Partial<MantineTheme>;
  /**
   * Имя модели
   */
  modelName: string;
};

/**
 * Выбрать модель для обновления
 */
export const OllamaModelCheck = observer(({ modelName, theme }: Props) => {
  const {
    selectedModels: { selectedEntities },
    onCheckModel,
  } = useOllamaStore();

  const checked = selectedEntities.has(modelName);

  const onChange = () => {
    onCheckModel(modelName);
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Checkbox label="Обновить" checked={checked} onChange={onChange} />
    </MantineProvider>
  );
});
OllamaModelCheck.displayName = "OllamaModelCheck";
