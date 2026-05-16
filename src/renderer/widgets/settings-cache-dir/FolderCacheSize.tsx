import { useEffect, useState } from "react";
import { Text } from "@mantine/core";

import { formatBytes } from "../lib/helpers";

/**
 * Настройка каталога кэширования данных / Его объём
 */
export const FolderCacheSize = () => {
  const [folderSize, setFolderSize] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = window.electronAPI.onReceiveCacheFolderSize(
      (receiveFolderSize) => {
        setFolderSize(receiveFolderSize);
      },
    );

    return unsubscribe;
  }, []);

  const folderSizeText = folderSize === null ? "..." : formatBytes(folderSize);

  return <Text>Занимаемый объём: {folderSizeText}</Text>;
};
