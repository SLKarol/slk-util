import { type MouseEventHandler } from "react";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import {
  IconBrandTelegram,
  IconClipboardCopy,
  IconDownload,
  IconLocationDown,
  IconWorld,
} from "@tabler/icons-react";

import {
  MEDIA_ACTION_COPY_LINK,
  MEDIA_ACTION_DOWNLOAD,
  MEDIA_ACTION_DOWNLOAD_SEND_TELEGRAM,
  MEDIA_ACTION_OPEN_IN_BROWSER,
  MEDIA_ACTION_TELEGRAM,
} from "../../lib/constants";

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
    <Flex gap="md" justify="center" align="center" direction="row" mt="0.5rem">
      <Tooltip label="Скачать">
        <ActionIcon
          data-id={mediaId}
          data-action={MEDIA_ACTION_DOWNLOAD}
          onClick={onClickAction}
        >
          <IconDownload />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Скопировать ссылку">
        <ActionIcon
          data-id={mediaId}
          data-action={MEDIA_ACTION_COPY_LINK}
          onClick={onClickAction}
        >
          <IconClipboardCopy />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Отправить ссылку в телеграм">
        <ActionIcon
          data-id={mediaId}
          data-action={MEDIA_ACTION_TELEGRAM}
          onClick={onClickAction}
        >
          <IconBrandTelegram />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Скачать и отправить в телеграм">
        <ActionIcon
          data-id={mediaId}
          data-action={MEDIA_ACTION_DOWNLOAD_SEND_TELEGRAM}
          onClick={onClickAction}
        >
          <IconLocationDown />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Открыть в броузере">
        <ActionIcon
          data-id={mediaId}
          data-action={MEDIA_ACTION_OPEN_IN_BROWSER}
          onClick={onClickAction}
        >
          <IconWorld />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};
