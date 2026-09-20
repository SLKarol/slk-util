import { Flex } from "@mantine/core";

import { ActionIconCloudDownload } from "./ActionIconCloudDownload";

type Props = {
  /**
   * Должна ли кнопка быть disabled
   */
  disabled?: boolean;
  /**
   * Обработчик клика
   * */
  onClick?: () => void;
};

/**
 * Тулбар с кнопками "Скачать далее"
 */
export const MoreDownload = ({ disabled, onClick }: Props) => {
  return (
    <Flex justify="space-between" align="center">
      <ActionIconCloudDownload disabled={disabled} onClick={onClick} />
      <ActionIconCloudDownload disabled={disabled} onClick={onClick} />
    </Flex>
  );
};
