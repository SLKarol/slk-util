import { ActionIcon, Group, TextInput } from "@mantine/core";
import { IconTrashFilled } from "@tabler/icons-react";

import { useSettingsFormContext } from "../providers/ContextFormSettingsTunnel";

type Props = {
  /**
   * Индекс записи в списке
   */
  indexOfRecord: number;
  /**
   * Имя поля списка
   */
  fieldName: string;
};

/**
 * Редактирование записи в списке
 */
export const ListItemInput = ({ fieldName, indexOfRecord }: Props) => {
  const form = useSettingsFormContext();
  return (
    <Group mt="xs">
      <TextInput
        placeholder="Адрес DNS"
        withAsterisk
        style={{ flex: 1 }}
        key={form.key(`${fieldName}.${indexOfRecord}.value`)}
        {...form.getInputProps(`${fieldName}.${indexOfRecord}.value`)}
      />
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem(fieldName, indexOfRecord)}
      >
        <IconTrashFilled size={16} />
      </ActionIcon>
    </Group>
  );
};
