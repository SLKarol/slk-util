import { observer } from "mobx-react-lite";
import { Text } from "@mantine/core";

import { type LogEntry } from "@renderer-features/ollama/model/ollama-update-log.types";
import { getLogColor } from "@renderer/widgets/ollama/lib/getColor";
import { OllamaUpdateInfoModel } from "@renderer-features/ollama/ui/OllamaUpdateRecord";

interface Props {
  /**
   * Строка лога обновления модели Ollama
   */
  log: LogEntry;
}

/**
 * Компонент для отображения записи лога обновления модели Ollama
 */
export const OllamaUpdateRecord = observer(
  ({ log: { message, model, status, time } }: Props) => {
    return (
      <Text
        size="sm"
        ff="monospace"
        c={getLogColor(status)}
        style={{ lineHeight: 1.6, whiteSpace: "pre-wrap" }}
      >
        <Text span c="dimmed" inherit>
          [{time}]
        </Text>{" "}
        <OllamaUpdateInfoModel model={model} />
        {message}
      </Text>
    );
  },
);
OllamaUpdateRecord.displayName = "OllamaUpdateRecord";
