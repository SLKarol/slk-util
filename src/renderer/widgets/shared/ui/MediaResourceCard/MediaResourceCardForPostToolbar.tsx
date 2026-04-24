import { type MouseEventHandler } from "react";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

/**
 * Свойства компонента `MediaResourceCardForPostToolbar`.
 *
 * @interface Props
 */
type Props = {
  /**
   * Уникальный идентификатор медиазаписи, к которой относится панель инструментов.
   */
  mediaId: string;

  /**
   * Обработчик клика по кнопке действия (например, удаление из рассылки).
   *
   * Вызывается при нажатии на значок в панели инструментов.
   */
  onClickAction: MouseEventHandler<HTMLButtonElement>;
};

/**
 * Компонент панели инструментов для карточки медиаресурса в режиме публикации.
 */
export const MediaResourceCardForPostToolbar = ({
  mediaId,
  onClickAction,
}: Props) => {
  return (
    <Flex gap="md" justify="center" align="center" direction="row">
      <Tooltip label="Исключить из рассылки">
        <ActionIcon
          data-id={mediaId}
          data-action="delete"
          onClick={onClickAction}
        >
          <IconTrash />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};
