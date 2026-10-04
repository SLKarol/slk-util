import { observer } from "mobx-react-lite";
import { Select } from "@mantine/core";

import { OPTION_TYPE_PROMPT_REACTION } from "../../lib/constants";
import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Выбор типа произведения
 */
export const SelectTypePrompt = observer(() => {
  const {
    reactionPoems: { setTypeReview, typeReview },
  } = useStihiRuRootStore();

  return (
    <Select
      data={OPTION_TYPE_PROMPT_REACTION}
      label="Тип произведения. Это влияет на выбор промпта."
      value={typeReview}
      onChange={(value) => setTypeReview(value as string)}
    />
  );
});
SelectTypePrompt.displayName = "SelectTypePrompt";
