import { Select } from "@mantine/core";

import { type MediaRecordUi } from "@renderer-shared/types/media";

type Props = {
  /**
   * Объект медиазаписи, отображаемой на карточке.
   *
   * Содержит информацию о заголовке, URL, статусе выбора и наличии медиаресурсов.
   */
  mediaRecord: MediaRecordUi;
};

/**
 * Выбор размеров медиа-ресурса
 */
export const MediaResourceCardSelectDimension = ({ mediaRecord }: Props) => {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={["React", "Angular", "Vue", "Svelte"]}
      mb="0.5rem"
    />
  );
};
