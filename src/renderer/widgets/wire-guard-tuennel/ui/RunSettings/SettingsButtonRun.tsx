import { Button, Container, Tooltip } from "@mantine/core";

/**
 * Сохранение настроек и запуск формирования строки тунеля
 */
export const SettingsButtonRun = () => {
  return (
    <Container m={0}>
      <Tooltip label="Сохранить и запустить генерацию настроек">
        <Button type="submit">Сформировать строку</Button>
      </Tooltip>
    </Container>
  );
};
