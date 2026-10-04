import { observer } from "mobx-react-lite";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Кнопка "Генерить отклик"
 */
export const GenerateReaction = observer(() => {
  const {
    reactionPoems: { enableGenerateReaction, generateReaction },
  } = useStihiRuRootStore();
  return (
    <Tooltip label="Сгенерировать отклик">
      <ActionIcon disabled={!enableGenerateReaction} onClick={generateReaction}>
        <IconSparkles />
      </ActionIcon>
    </Tooltip>
  );
});
GenerateReaction.displayName = "GenerateReaction";
