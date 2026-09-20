import { ActionIcon } from "@mantine/core";
import { IconMessage2Down } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useYaPlakalRuRootStore } from "@renderer/providers/ya-plakal/useYaplakalRootStore";
import { checkUrlTopic } from "@renderer/widgets/yaplakal/lib/helpers";

/**
 * Кнопка скачать топик
 */
export const DownloadTopic = observer(() => {
  const {
    selectMaterialStore: { url, setWorking, working },
    collection: { clearCollection },
  } = useYaPlakalRuRootStore();

  const disabled = checkUrlTopic(url);

  const onClick = () => {
    setWorking(true);
    clearCollection();
    window.electronAPI.fetchYaPlakalTopic(url);
  };

  return (
    <ActionIcon
      variant="filled"
      disabled={working || !disabled}
      onClick={onClick}
    >
      <IconMessage2Down />
    </ActionIcon>
  );
});
DownloadTopic.displayName = "DownloadTopic";
