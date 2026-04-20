import { Flex } from "@mantine/core";

import { ActionIconWorldDownload } from "./ActionIconWorldDownload";

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
      <ActionIconWorldDownload disabled={disabled} onClick={onClick} />
      <ActionIconWorldDownload disabled={disabled} onClick={onClick} />
    </Flex>
  );
};
