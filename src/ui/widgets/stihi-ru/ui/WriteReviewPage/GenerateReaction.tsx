import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";

/**
 * Кнопка "Генерить отклик"
 */
export const GenerateReaction = () => {
  return (
    <Tooltip label="Сгенерировать отклик">
      <ActionIcon>
        <IconSparkles />
      </ActionIcon>
    </Tooltip>
  );
};
