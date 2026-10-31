import { Stack } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useOllamaStore } from "@renderer/providers/ollama";
import { OllamaModelCard } from "./OllamaModelCard";

/**
 * Таблица с локальными моделями Ollama
 */
export const OllamaModelsList = observer(() => {
  const { listInstalledOllamaModels } = useOllamaStore();

  return (
    <Stack gap="xs">
      {listInstalledOllamaModels.map((model) => (
        <OllamaModelCard key={model.name} model={model} />
      ))}
    </Stack>
  );
});
