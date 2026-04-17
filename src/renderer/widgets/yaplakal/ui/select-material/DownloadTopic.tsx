import { ActionIcon } from "@mantine/core";
import { IconMessage2Down } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useYaPlakalRuRootStore } from "@renderer/providers/ya-plakal/useYaplakalRootStore";
import { checkUrlTopic } from "@renderer/widgets/yaplakal/lib/helpers/checkUrlTopic";

/**
 * Кнопка скачать топик
 */
export const DownloadTopic = observer(() => {
  const {
    selectMaterialStore: { url, setWorking, working },
  } = useYaPlakalRuRootStore();

  const disabled = checkUrlTopic(url);

  const onClick = () => {
    setWorking(true);
    window.electronAPI.fetchText(url);
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
