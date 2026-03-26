import { Button, Text, Tooltip } from "@mantine/core";

export const ListVerseButtonOpenAll = () => {
  return (
    <>
      <Tooltip label="Открыть во вкладках все произведения">
        <Button variant="light" color="cyan">
          Открыть все
        </Button>
      </Tooltip>
      <Text size="sm">Запросы могут занять некоторое время</Text>
    </>
  );
};
