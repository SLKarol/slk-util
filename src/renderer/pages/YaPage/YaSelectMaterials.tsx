import { Group } from "@mantine/core";

import {
  DownloadTopic,
  InputUrl,
  YaPager,
} from "@renderer/widgets/yaplakal/ui/select-material";

/**
 * Раздел выбора материалов.
 */
export const YaSelectMaterials = () => {
  return (
    <>
      <Group gap="xs" align="flex-end" mb="1rem">
        <InputUrl />
        <DownloadTopic />
      </Group>
      <YaPager />
    </>
  );
};
