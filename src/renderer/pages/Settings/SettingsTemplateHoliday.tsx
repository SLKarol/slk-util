import {
  ActionIcon,
  Container,
  Flex,
  Stack,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconDeviceFloppyFilled } from "@tabler/icons-react";

import { useEditTemplateHoliday } from "@renderer/widgets/settings/helpers";

/**
 * Настройки / Текст праздничного поздравления
 */
export const SettingsTemplateHoliday = () => {
  const { onClickSaveTemplateHoliday, setTemplateHoliday, templateHoliday } =
    useEditTemplateHoliday();

  return (
    <Container size="lg" pb="1rem">
      <Stack>
        <Title order={5}>Шаблон поздравления</Title>
        <Flex justify="space-between" align="flex-end" gap="1rem">
          <TextInput
            value={templateHoliday}
            onChange={setTemplateHoliday}
            flex={1}
            label="Шаблон текста о сегодняшнем празднике"
            description="Название праздника задаётся как $HOLYDAY"
          />
          <Tooltip label="Сохранить">
            <ActionIcon variant="filled" onClick={onClickSaveTemplateHoliday}>
              <IconDeviceFloppyFilled />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Stack>
    </Container>
  );
};
