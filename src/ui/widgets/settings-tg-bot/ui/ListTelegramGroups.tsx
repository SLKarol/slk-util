import { Container, Text } from "@mantine/core";

import { useSettingsFormContext } from "../providers/ContextFormSettingsTunnel";

import { AddNewItem } from "@renderer/widgets/shared/ui/AddNewItem";
import { ListItemInput } from "@renderer/widgets/shared/ui/ListItemInput";

/**
 * Настройка списка групп в телеграме
 */
export const ListTelegramGroups = () => {
  const form = useSettingsFormContext();

  return (
    <Container flex={2}>
      <Text fw="bold">Группы, в которую делать рассылку</Text>
      {form.getValues().telegramGroups.map((group, indexOfDns) => (
        <ListItemInput
          key={group.key}
          fieldName="telegramGroups"
          indexOfRecord={indexOfDns}
          form={form}
        />
      ))}
      <AddNewItem
        fieldName="telegramGroups"
        form={form}
        whatAdd="Добавить группу"
      />
    </Container>
  );
};
