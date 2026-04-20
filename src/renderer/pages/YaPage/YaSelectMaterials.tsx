import { Group } from "@mantine/core";

import { MoreDownload } from "@renderer/widgets/shared/ui";
import {
  DownloadTopic,
  InputUrl,
} from "@renderer/widgets/yaplakal/ui/select-material";

/**
 * Раздел выбора материалов.
 */
export const YaSelectMaterials = () => {
  return (
    <>
      <Group gap="xs" align="flex-end">
        <InputUrl />
        <DownloadTopic />
      </Group>
      <MoreDownload onClick={() => null} />
    </>
  );
};
