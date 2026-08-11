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
    },
  } = useRootStore();

  return (
    <Checkbox
      checked={shouldWriteAboutHolidayWithAI}
      onChange={(changeEvent) =>
        setShouldWriteAboutHolidayWithAI(changeEvent.currentTarget.checked)
      }
      label="Писать о празднике при помощи ИИ"
    />
  );
});
ShouldWriteAboutHolidayWithAICheckbox.displayName =
  "ShouldWriteAboutHolidayWithAICheckbox";
