import { useMemo } from "react";
import { ActionIcon, Flex, Text } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconClipboardCopy } from "@tabler/icons-react";

interface ExcludedValueProps {
  address: string[];
}

/**
 * Компонент для отображения исключённых CIDR-диапазонов.
 */
export const ExcludedValue = ({ address }: ExcludedValueProps) => {
  const strValue = useMemo(() => address.join(", "), [address]);
  const clipboard = useClipboard({ timeout: 500 });
  return (
    <Flex gap="1rem">
      <Text flex={1}>{strValue}</Text>
      <ActionIcon
        variant="filled"
        aria-label="Settings"
        c={clipboard.copied ? "teal" : undefined}
        onClick={() => clipboard.copy(strValue)}
      >
        <IconClipboardCopy stroke={1.5} />
      </ActionIcon>
    </Flex>
  );
};
