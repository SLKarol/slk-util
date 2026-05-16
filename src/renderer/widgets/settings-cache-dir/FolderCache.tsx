import { useEffect, useState } from "react";
import { Text } from "@mantine/core";

/**
 * Настройка каталога кэширования данных / Полное имя каталога
 */
export const FolderCache = () => {
  const [folderName, setFolderName] = useState("");
  useEffect(() => {
    const unsubscribe = window.electronAPI.onReceiveSetting((settings) => {
      setFolderName(settings.cacheDir);
    });

    return unsubscribe;
  }, []);
  return <Text>{folderName}</Text>;
};
