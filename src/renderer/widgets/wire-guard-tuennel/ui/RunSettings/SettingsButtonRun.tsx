import { Container } from "@mantine/core";

/**
 * Сохранение настроек и запуск формирования строки тунеля
 */
export const SettingsButtonRun = () => {
  return (
    <Container m={0}>
      <button title="Сохранит и запускает" type="submit">
        Сформировать строку
      </button>
    </Container>
  );
};
