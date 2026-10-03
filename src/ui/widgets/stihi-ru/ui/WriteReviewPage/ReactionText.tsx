import { Text, Textarea } from "@mantine/core";
import { formatCount } from "@renderer-shared/lib";

/**
 * Текст сгенерированного отклика
 */
export const ReactionText = () => {
  return (
    <Textarea
      placeholder="Сгенерированный отклик"
      autosize
      minRows={4}
      bottomSection={
        <Text size="xs" c="dimmed">
          {formatCount(13, ["символ", "символа", "символов"])}
        </Text>
      }
      w="100%"
    />
  );
};
