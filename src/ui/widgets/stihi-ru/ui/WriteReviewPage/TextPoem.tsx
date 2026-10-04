import { observer } from "mobx-react-lite";
import { Textarea } from "@mantine/core";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Текст произведения
 */
export const TextPoem = observer(() => {
  const {
    reactionPoems: { setTextOfPoem, textOfPoem },
  } = useStihiRuRootStore();

  return (
    <Textarea
      placeholder="Текст"
      label="Текст произведения"
      autosize
      minRows={4}
      w="100%"
      value={textOfPoem}
      onChange={(inputEvent) => setTextOfPoem(inputEvent.target.value)}
    />
  );
});
TextPoem.displayName = "TextPoem";
