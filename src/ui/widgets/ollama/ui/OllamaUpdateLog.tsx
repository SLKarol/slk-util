import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { ScrollArea } from "@mantine/core";

import { useOllamaStore } from "@renderer/providers/ollama";
import { OllamaUpdateRecord } from "./OllamaUpdateRecord";

/**
 * Компонент для отображения лога обновления моделей Ollama
 */
export const OllamaUpdateLog = observer(() => {
  const {
    ollamaUpdateLogs: { logs },
  } = useOllamaStore();
  /** Ссылка на viewport для программной прокрутки */
  const viewport = useRef<HTMLDivElement>(null);

  // Автоскролл вниз при добавлении нового лога
  useEffect(() => {
    if (viewport.current) {
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [logs.length]);

  return (
    <ScrollArea
      h="calc(66.67vh + 4rem)"
      viewportRef={viewport}
      type="auto"
      scrollbars="y" // Отключаем горизонтальный скролл, чтобы не ломал верстку
      offsetScrollbars
    >
      {logs.map((log) => (
        <OllamaUpdateRecord key={log.id} log={log} />
      ))}
    </ScrollArea>
  );
});
OllamaUpdateLog.displayName = "OllamaUpdateLog";
