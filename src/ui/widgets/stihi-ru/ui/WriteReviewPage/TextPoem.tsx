import { Textarea } from "@mantine/core";

/**
 * Текст произведения
 */
export const TextPoem = () => {
  return (
    <Textarea
      placeholder="Текст"
      label="Текст произведения"
      autosize
      minRows={4}
      w="100%"
    />
  );
};
