import { Container, Stack } from "@mantine/core";

import { SelectorMediaYap } from "@renderer/widgets/settings/ui";

export const SettingsSelectorYap = () => {
  return (
    <Container size="lg" pb="1rem">
      <Stack>
        <SelectorMediaYap />
      </Stack>
    </Container>
  );
};
