import { useState } from "react";
import { ActionIcon, Flex, Select } from "@mantine/core";
import { IconDeviceFloppyFilled } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { type MediaRecordStore } from "@renderer-features/model/media-record";

type Props = {
  /**
   * Объект медиазаписи, отображаемой на карточке.
   *
   * Содержит информацию о заголовке, URL, статусе выбора и наличии медиаресурсов.
   */
  mediaRecord: MediaRecordStore;
};

/**
 * Выбор размеров медиа-ресурса
 */
export const MediaResourceCardSelectDimension = observer(
  ({ mediaRecord }: Props) => {
    const [urlDimension, setUrlDimension] = useState<string | null>(null);

    // Явно читаем observable-поле в реактивном контексте
    const images = mediaRecord.preview?.images;

    if (!images || !Array.isArray(images) || images.length === 0) return null;

    const { title } = mediaRecord;

    const data = mediaRecord.preview?.images[0].resolutions.map(
      ({ height, url, width }) => ({
        label: `${width}x${height}`,
        value: url,
      }),
    );

    const onClick = () => {
      if (!urlDimension) return;

      window.electronAPI.downloadFile({
        name: title,
        url: urlDimension,
      });
    };

    return (
      <Flex gap="xs" justify="center" align="center" direction="row">
        <Select
          label="Сохранить в выбранном размере"
          placeholder="Выбрать размер"
          data={data}
          value={urlDimension}
          onChange={setUrlDimension}
          mb="0.5rem"
        />
        <ActionIcon disabled={!urlDimension} mt="1rem" onClick={onClick}>
          <IconDeviceFloppyFilled />
        </ActionIcon>
      </Flex>
    );
  },
);
MediaResourceCardSelectDimension.displayName =
  "MediaResourceCardSelectDimension";
