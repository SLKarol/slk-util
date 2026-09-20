import { NumberInput } from "@mantine/core";

import { useSettingsFormContext } from "../providers/ContextFormSettingsTunnel";

export const InputWait = () => {
  const form = useSettingsFormContext();
  return (
    <NumberInput
      label="Введите время в секундах- ожидание между рассылкой в группы"
      placeholder="От 1 до 60"
      min={1}
      max={60}
      key={form.key("waitSeconds")}
      {...form.getInputProps("waitSeconds")}
    />
  );
};
