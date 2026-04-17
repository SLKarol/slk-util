import { ActionIcon } from "@mantine/core";
import { IconMessage2Down } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useYaPlakalRuRootStore } from "@renderer/providers/ya-plakal/useStihiRuRootStore";
import { checkUrlTopic } from "@renderer/widgets/yaplakal/lib/helpers/checkUrlTopic";

/**
 * Кнопка скачать топик
 */
export const DownloadTopic = observer(() => {
  const {
    selectMaterialStore: { url },
  } = useYaPlakalRuRootStore();

  const disabled = checkUrlTopic(url);

  return (
    <ActionIcon variant="filled" disabled={!disabled}>
      <IconMessage2Down />
    </ActionIcon>
  );
});
DownloadTopic.displayName = "DownloadTopic";
