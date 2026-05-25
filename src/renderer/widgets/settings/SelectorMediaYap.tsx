import { ActionIcon, Flex, TextInput, Tooltip } from "@mantine/core";
import { IconDeviceFloppyFilled } from "@tabler/icons-react";

import { useEditSelectorMediaYap } from "./helpers";

/**
 * Настройки / CSS селектор для извлечения медиа-данных страницы ЯП
 */
export const SelectorMediaYap = () => {
  const { cssSelector, onClickSaveSelectorMediaYap, setCssSelector } =
    useEditSelectorMediaYap();

  return (
    <Flex justify="space-between" align="flex-end" gap="1rem">
      <TextInput
        value={cssSelector}
        onChange={setCssSelector}
        flex={1}
        label="CSS селектор"
        description="CSS-selector для извлечения медиа-данных страницы ЯП"
      />
      <Tooltip label="Сохранить">
        <ActionIcon variant="filled" onClick={onClickSaveSelectorMediaYap}>
          <IconDeviceFloppyFilled />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};
