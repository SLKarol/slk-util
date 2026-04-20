import { ActionIcon } from "@mantine/core";
import { IconWorldDownload } from "@tabler/icons-react";

type Props = {
  /**
   * Должна ли кнопка быть disabled
   */
  disabled?: boolean;
  /**
   * Обработчик клика
   */
  onClick?: () => void;
};

/**
 * Компонента "Скачать далее"
 */
export const ActionIconWorldDownload = ({ disabled, onClick }: Props) => {
  return (
    <ActionIcon variant="filled" onClick={onClick} disabled={disabled}>
      <IconWorldDownload />
    </ActionIcon>
  );
};
