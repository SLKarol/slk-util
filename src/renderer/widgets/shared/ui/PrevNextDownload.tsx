import { ActionIcon, Flex } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type Props = {
  onClickPrev?: () => void;
  onClickNext?: () => void;
  disabledPrev?: boolean;
  disabledNext?: boolean;
};

/**
 * Тулбар для переключения страниц
 */
export const PrevNextDownload = ({
  disabledPrev,
  disabledNext,
  onClickNext,
  onClickPrev,
}: Props) => {
  return (
    <Flex justify="space-between" align="center">
      <ActionIcon
        variant="filled"
        onClick={onClickPrev}
        disabled={disabledPrev}
      >
        <IconChevronLeft />
      </ActionIcon>
      <ActionIcon
        variant="filled"
        onClick={onClickNext}
        disabled={disabledNext}
      >
        <IconChevronRight />
      </ActionIcon>
    </Flex>
  );
};
