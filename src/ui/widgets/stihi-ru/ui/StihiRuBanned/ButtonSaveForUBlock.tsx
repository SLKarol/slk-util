import { Button } from "@mantine/core";
import { IconFileDownloadFilled } from "@tabler/icons-react";

export const ButtonSaveForUBlock = () => {
  const onClick = () => {
    window.electronAPI.saveBansAsUblock();
  };
  return (
    <Button
      leftSection={<IconFileDownloadFilled size={14} />}
      onClick={onClick}
      m="auto"
    >
      Сохранить для uBlock
    </Button>
  );
};
