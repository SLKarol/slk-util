import { Select } from "@mantine/core";
import { OPTION_TYPE_PROMPT_REACTION } from "../../lib/constants";

/**
 * Выбор типа произведения
 */
export const SelectTypePrompt = () => {
  return (
    <Select
      data={OPTION_TYPE_PROMPT_REACTION}
      label="Тип произведения. Это влияет на выбор промпта."
    />
  );
};
