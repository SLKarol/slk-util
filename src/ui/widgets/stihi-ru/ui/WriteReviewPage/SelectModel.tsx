import { observer } from "mobx-react-lite";
import { Select } from "@mantine/core";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Выбор моделей ollama
 */
export const SelectModel = observer(() => {
  const {
    reactionPoems: {
      ollamaModels: { ollamaModelsUi },
      selectedModel: { selectedEntityId, setSelectedEntityId },
    },
  } = useStihiRuRootStore();

  return (
    <Select
      label="Выберите модель ollama"
      data={ollamaModelsUi}
      value={selectedEntityId || null}
      onChange={(value) => setSelectedEntityId(value ?? "")}
    />
  );
});
SelectModel.displayName = "SelectModel";
