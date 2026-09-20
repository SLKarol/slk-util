import { useEffect } from "react";
import { Container, Flex, Stack, Title } from "@mantine/core";

import {
  ChangeFolderCache,
  ClearFolderCache,
  FolderCache,
  FolderCacheSize,
} from "@renderer/widgets/settings-cache-dir";

/**
 * Настройка каталога для кэширования данных
 */
export const SettingsCacheDir = () => {
  // Настроить обработчики событий загрузки настроек
  useEffect(() => {
    window.electronAPI.fetchSettings();
    window.electronAPI.requestCacheFolderSize();
  }, []);

  return (
    <Container size="lg" pb="1rem">
      <Stack>
        <Title order={5}>Каталог для кэширования данных</Title>
        <Flex justify="space-between" align="center">
          <FolderCache />
          <ChangeFolderCache />
        </Flex>
        <Flex gap="1rem" align="center">
          <FolderCacheSize />
          <ClearFolderCache />
        </Flex>
      </Stack>
    </Container>
  );
};
