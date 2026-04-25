import { Button, Flex, Stack, Text, Title } from "@mantine/core";

import { useInputFolderSettings } from "./helpers/useInputFolderSettings";

/**
 * Настройка каталога для сохранения медиа-файлов
 */
export const FolderForSaveFiles = () => {
  const { folderSavePath, onClickChangeFolder } = useInputFolderSettings();

  return (
    <Stack>
      <Title order={5}>Каталог для сохранения медиа-файлов</Title>
      <Flex justify="space-between" align="center">
        <Text>{folderSavePath}</Text>
        <Button onClick={onClickChangeFolder}>Изменить</Button>
      </Flex>
    </Stack>
  );
};
