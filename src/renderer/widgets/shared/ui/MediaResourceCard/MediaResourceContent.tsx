import { Text } from "@mantine/core";
import { match, P } from "ts-pattern";

import { type MediaRecordUi } from "@renderer-shared/types/media";

import { MediaResourceCollectionImages } from "./MediaResourceCollectionImages";
import { MediaResourceImage } from "./MediaResourceImage";

interface Props {
  mediaRecord: MediaRecordUi;
}

export const MediaResourceContent = ({ mediaRecord }: Props) => {
  return match(mediaRecord)
    .with({ noMedia: true }, () => (
      <Text>Не содержит (или не найдены) медиа-ресурсы</Text>
    ))
    .with(
      {
        haveVideo: false,
        url: P.when((s) => typeof s === "string" && s.length > 0),
        collection: P.nonNullable,
      },
      () => (
        <MediaResourceCollectionImages collection={mediaRecord.collection} />
      ),
    )
    .with(
      {
        haveVideo: false,
        url: P.when((s) => typeof s === "string" && s.length > 0),
      },
      () => <MediaResourceImage mediaRecord={mediaRecord} />,
    )
    .with(
      {
        haveVideo: true,
        url: P.when((s) => typeof s === "string" && s.length > 0),
      },
      () => (
        <video
          width="100%"
          controls
          poster={mediaRecord.previewDecode ?? undefined}
        >
          <source src={mediaRecord.url as string} />
        </video>
      ),
    )
    .otherwise((): null => null);
};
