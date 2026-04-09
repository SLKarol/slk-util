import { Button, Container } from "@mantine/core";
import { randomId } from "@mantine/hooks";

import { useSettingsFormContext } from "../providers/ContextFormSettingsTunnel";

interface AddNewProps {
  /**
   * Имя поля- в этот массив будут добавляться новые значения
   */
  fieldName: string;
}

/**
 * Настройк туннеля / Добавить новую строку
 */
export const AddNew = ({ fieldName }: AddNewProps) => {
  const form = useSettingsFormContext();

  const whatAdd = fieldName === "siteInfoDnsServers" ? "DNS" : "домен";

  return (
    <Container p={0}>
      <Button
        onClick={() =>
          form.insertListItem(fieldName, {
            value: "",
            key: randomId(),
          })
        }
      >
        {`Добавить ${whatAdd}`}
      </Button>
    </Container>
  );
};
