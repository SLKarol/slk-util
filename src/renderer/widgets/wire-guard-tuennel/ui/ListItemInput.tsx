import { ActionIcon, Group, TextInput } from "@mantine/core";
import { IconTrashFilled } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useSettingsFormContext } from "../providers/ContextFormSettingsTunnel";

import { useWireGuardTunnelRootStore } from "@renderer/providers/wire-guard-tunnel/useWireGuardTunnelRootStore";

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
export const ListItemInput = observer(({ fieldName, indexOfRecord }: Props) => {
  const {
    status: { isWorking },
  } = useWireGuardTunnelRootStore();
  const form = useSettingsFormContext();
  return (
    <Group mt="xs">
      <TextInput
        placeholder="Адрес DNS"
        withAsterisk
        style={{ flex: 1 }}
        key={form.key(`${fieldName}.${indexOfRecord}.value`)}
        disabled={isWorking}
        {...form.getInputProps(`${fieldName}.${indexOfRecord}.value`)}
      />
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem(fieldName, indexOfRecord)}
        disabled={isWorking}
      >
        <IconTrashFilled size={16} />
      </ActionIcon>
    </Group>
  );
});
ListItemInput.displayName = "ListItemInput";
