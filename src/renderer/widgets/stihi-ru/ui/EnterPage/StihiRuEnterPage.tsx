import { Card, Container, Group } from "@mantine/core";

import { ButtonCheckBrowserName } from "./ButtonCheckBrowserName";
import { ButtonRunEnter } from "./ButtonRunEnter";
import { ButtonSaveBrowserName } from "./ButtonSaveBrowserName";
import { ButtonStopEnter } from "./ButtonStopEnter";
import { EnterPageInputData } from "./EnterPageInputData";
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
      </Group>
      <Group justify="space-between" p="md">
        <EnterPageInputData />
        <ButtonRunEnter />
        <ButtonStopEnter />
      </Group>
    </Container>
  );
};
StihiRuEnterPage.displayName = "StihiRuEnterPage";
