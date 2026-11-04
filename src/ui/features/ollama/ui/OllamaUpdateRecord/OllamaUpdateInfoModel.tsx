import { Text } from "@mantine/core";

interface Props {
  /**
   * Название модели, к которой относится лог. Если не указано, то лог относится к общему процессу обновления Ollama
   */
  model: string;
}

/**
 * Компонент для отображения информации о модели в записи обновления Ollama
 */
export const OllamaUpdateInfoModel = ({ model }: Props) => {
  if (model)
    return (
      <>
        <Text span c="blue" inherit>
          [{model}]
        </Text>
        <> </>
      </>
    );

  return null;
};
