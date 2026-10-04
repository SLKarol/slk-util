import { observer } from "mobx-react-lite";
import { Text } from "@mantine/core";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Та часть ответа, которая отвечает за "размышления"
 */
export const PromptResultThought = observer(() => {
  const {
    reactionPoems: { promptResultThought },
  } = useStihiRuRootStore();

  return <Text>{promptResultThought}</Text>;
});
PromptResultThought.displayName = "PromptResultThought";
