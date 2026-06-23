import { Image } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { type MediaRecordStore } from "@renderer-features/model/media-record";

type Props = {
  /**
   * Объект медиазаписи, отображаемой на карточке.
   */
  mediaRecord: MediaRecordStore;
};

/**
 * Компонент для отображения изображения медиаресурса.
 */
export const MediaResourceImage = observer(
  ({ mediaRecord: { title, url, preview, fileDecode } }: Props) => {
    let src = url;
    if (!src && preview?.images?.length) {
      const [firstImage] = preview.images;
      src = firstImage.source.url;
    }

    if (fileDecode) src = fileDecode;

    return <Image src={src} title={title} w="100%" />;
  },
);
MediaResourceImage.displayName = "MediaResourceImage";
