import { Button, Container } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form/lib";
import { randomId } from "@mantine/hooks";

interface AddNewProps {
  /**
   * Имя поля- в этот массив будут добавляться новые значения
   */
  fieldName: string;

  /**
   * Форма, в которой находится поле
   */
  form: UseFormReturnType<unknown, unknown, any>;

  /**
   * Подпись вида: "Добавить DNS" или "Добавить домен"
   */
  whatAdd: string;
}

/**
 * Добавить новую строку в массив
 */
export const AddNewItem = ({ fieldName, form, whatAdd }: AddNewProps) => {
  return (
    <Container p={0}>
      <Button
        onClick={() =>
          form.insertListItem(fieldName, {
            value: "",
            key: randomId(),
          })
        }
        disabled={fieldName === "siteInfoDnsServers"}
      >
        {whatAdd}
      </Button>
    </Container>
  );
};
