import { observer } from "mobx-react-lite";
import { Text, Textarea } from "@mantine/core";
import { formatCount } from "@renderer-shared/lib";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Текст сгенерированного отклика
 */
export const PromptResultOutput = observer(() => {
  const {
    reactionPoems: { promptResultOutput },
  } = useStihiRuRootStore();

  return (
    <Textarea
      placeholder="Сгенерированный отклик"
      autosize
      minRows={4}
      bottomSection={
        <Text size="xs" c="dimmed">
          {formatCount(promptResultOutput.length, [
            "символ",
            "символа",
            "символов",
          ])}
        </Text>
      }
      w="100%"
      value={promptResultOutput}
    />
  );
});
PromptResultOutput.displayName = "PromptResultOutput";
