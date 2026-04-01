import { Card, Container, Group } from "@mantine/core";

import { ButtonCheckBrowserName } from "./ButtonCheckBrowserName";
import { ButtonRunEnter } from "./ButtonRunEnter";
import { ButtonSaveBrowserName } from "./ButtonSaveBrowserName";
import { InputBrowserProcess } from "./InputBrowserProcess";

/**
 * Страница, где настраивается бот.
 */
export const StihiRuEnterPage = () => {
  return (
    <Container size="sm">
      <Card withBorder radius="md" p="xl">
        <InputBrowserProcess />
      </Card>
      <Group justify="space-between" p="md">
        <ButtonCheckBrowserName />
        <ButtonSaveBrowserName />
        <ButtonRunEnter />
      </Group>
    </Container>
  );
};
StihiRuEnterPage.displayName = "StihiRuEnterPage";
