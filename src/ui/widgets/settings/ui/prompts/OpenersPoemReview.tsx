import { Container, Text } from "@mantine/core";

import { useSettingsTemplatePromptFormContext } from "../../providers";
import { AddNewItem, ListItemInput } from "@renderer/widgets/shared/ui";

/**
 * Настройка списка открывающих текстов реакций
 */
export const OpenersPoemReview = () => {
  const form = useSettingsTemplatePromptFormContext();

  return (
    <Container>
      <Text fw="bold">Примеры, с чего можно начинать текст реакции</Text>
      {form.getValues().listOpenersPoemReview.map((opener, indexOfOpener) => (
        <ListItemInput
          key={opener.key}
          fieldName="listOpenersPoemReview"
          indexOfRecord={indexOfOpener}
          form={form}
        />
      ))}
      <AddNewItem
        fieldName="listOpenersPoemReview"
        form={form}
        whatAdd="Добавить вариант"
      />
    </Container>
  );
};
