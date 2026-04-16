import { createFormContext } from "@mantine/form";

import { StringValueWithKey } from "@renderer/widgets/lib/types";

/**
 * Интерфейс, определяющий структуру значений формы настроек.
 */
export interface SettingsFormValues {
  /**
   * Токен телеграм-бота
   */
  telegramToken: string;
  /**
   * ID телеграмм-групп, в которые можно делать рассылку.
   */
  telegramGroups: StringValueWithKey[];
  /**
   * ID телеграм-чата бота с админом. Сюда будут записываться картинки для отправки в альбомы.
   */
  telegramAdmin: string;
}

// You can give context variables any name
export const [SettingsFormProvider, useSettingsFormContext, useSettingsForm] =
  createFormContext<SettingsFormValues>();
