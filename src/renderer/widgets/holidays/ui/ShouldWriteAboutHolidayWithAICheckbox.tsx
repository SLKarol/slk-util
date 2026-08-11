import { useEffect, useState } from "react";
import { Checkbox } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useRootStore } from "@renderer/providers/useRootStore";

/**
 * Чекбокс для включения/отключения записи в рассылку о празднике при помощи ИИ
 */
export const ShouldWriteAboutHolidayWithAICheckbox = observer(() => {
  const {
    holidaysStore: {
      setShouldWriteAboutHolidayWithAI,
      shouldWriteAboutHolidayWithAI,
      sendHolidayName,
    },
  } = useRootStore();

  const [hasSettingsOllama, setHasSettingsOllama] = useState(false);

  useEffect(() => {
    window.electronAPI.fetchSettings();

    const unsubscribe = window.electronAPI.onReceiveSetting((settings) => {
      const checkSettingsOllama =
        Boolean(settings.ollama.host) &&
        Boolean(settings.ollama.model) &&
        Boolean(settings.templatesPrompts.holiday);
      setHasSettingsOllama(checkSettingsOllama);
    });
    return unsubscribe;
  }, []);

  return (
    <Checkbox
      checked={shouldWriteAboutHolidayWithAI}
      onChange={(changeEvent) =>
        setShouldWriteAboutHolidayWithAI(changeEvent.currentTarget.checked)
      }
      disabled={hasSettingsOllama && !sendHolidayName}
      label="Писать о празднике при помощи ИИ"
    />
  );
});
ShouldWriteAboutHolidayWithAICheckbox.displayName =
  "ShouldWriteAboutHolidayWithAICheckbox";
