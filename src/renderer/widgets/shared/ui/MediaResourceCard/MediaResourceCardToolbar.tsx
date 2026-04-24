import { type MouseEventHandler } from "react";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconBrandTelegram, IconDownload } from "@tabler/icons-react";

/**
 * Свойства компонента `MediaResourceCardToolbar`.
 *
 * @interface Props
 */
type Props = {
  /**
   * Уникальный идентификатор медиазаписи, к которой относится панель инструментов.
   */
  mediaId: string;

  /**
   * Обработчик клика по кнопке действия (например, скачивание или отправка в Telegram).
   *
   * Вызывается при нажатии на одну из иконок в панели инструментов.
   * Определяет действие на основе атрибута `data-action`.
   */
  onClickAction: MouseEventHandler<HTMLButtonElement>;
};

/**
 * Компонент панели инструментов для карточки медиаресурса.
 */
export const MediaResourceCardToolbar = ({ mediaId, onClickAction }: Props) => {
  return (
    <Flex gap="md" justify="center" align="center" direction="row">
      <Tooltip label="Скачать">
        <ActionIcon
          data-id={mediaId}
          data-action="download"
          onClick={onClickAction}
        >
          <IconDownload />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Отправить в телеграм">
        <ActionIcon
          data-id={mediaId}
          data-action="telegram"
          onClick={onClickAction}
        >
          <IconBrandTelegram />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};
