import { ActionIcon, Group, TextInput } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form/lib";
import { IconTrashFilled } from "@tabler/icons-react";

type Props = {
  /**
   * Индекс записи в списке
   */
  indexOfRecord: number;
  /**
   * Имя поля списка
   */
  fieldName: string;

  /**
   * Состояние disabled для инпута
   */
  disabled?: boolean;

  /**
   * Форма Mantine
   */
  form: UseFormReturnType<unknown, unknown, any>;
};

/**
 * Редактирование записи в списке
 */
export const ListItemInput = ({
  fieldName,
  form,
  indexOfRecord,
  disabled,
}: Props) => {
  return (
    <Group mt="xs">
      <TextInput
        withAsterisk
        style={{ flex: 1 }}
        key={form.key(`${fieldName}.${indexOfRecord}.value`)}
        disabled={disabled}
        {...form.getInputProps(`${fieldName}.${indexOfRecord}.value`)}
      />
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem(fieldName, indexOfRecord)}
        disabled={disabled}
      >
        <IconTrashFilled size={16} />
      </ActionIcon>
    </Group>
  );
};
ListItemInput.displayName = "ListItemInput";
