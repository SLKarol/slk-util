import { type ComboboxData } from "@mantine/core/lib";

/**
 * Тип произведения.
 */
export const OPTION_TYPE_PROMPT_REACTION: ComboboxData<string> = [
  { label: "Обычное произведение", value: "simple" },
  { label: "Нейро-творчество", value: "neuro" },
];
