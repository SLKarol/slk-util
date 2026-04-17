import { Group } from "@mantine/core";

import { DownloadTopic } from "@renderer/widgets/yaplakal/ui/select-material/DownloadTopic";
import { InputUrl } from "@renderer/widgets/yaplakal/ui/select-material/InputUrl";

/**
 * Раздел выбора материалов.
 */
export const YaSelectMaterials = () => {
  return (
    <Group gap="xs" align="flex-end">
      <InputUrl />
      <DownloadTopic />
    </Group>
  );
};
