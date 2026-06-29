import { Container, Stack } from "@mantine/core";

import { FolderForSaveFiles } from "@renderer/widgets/settings-folder/FolderForSaveFiles";

/**
 * Настройки папки для сохранения файлов. Включая временный каталог, который используется для хранения промежуточных данных и кэша. Пользователь может выбрать папку для сохранения своих файлов, а также управлять временным каталогом, включая его объём и возможность очистить его при необходимости.
 */
export const SettingsFolderForSaveFiles = () => {
  return (
    <Container size="lg" pb="1rem">
      <Stack>
        <FolderForSaveFiles />
      </Stack>
    </Container>
  );
};
