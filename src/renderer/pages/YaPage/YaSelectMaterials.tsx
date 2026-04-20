import { Group } from "@mantine/core";

import { ListMedia } from "@renderer/widgets/shared/ui";
import {
  DownloadTopic,
  InputUrl,
  YaListMedia,
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
      <ListMedia>
        <YaListMedia />
      </ListMedia>
      <YaPager />
    </>
  );
};
