import { Text } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { match, P } from "ts-pattern";

import { type MediaRecordStore } from "@renderer-features/model/media-record";

import { MediaResourceCollectionImages } from "./MediaResourceCollectionImages";
import { MediaResourceImage } from "./MediaResourceImage";

interface Props {
  mediaRecord: MediaRecordStore;
}

export const MediaResourceContent = observer(({ mediaRecord }: Props) => {
  return match(mediaRecord)
    .with({ noMedia: true }, () => (
      <Text>Не содержит (или не найдены) медиа-ресурсы</Text>
    ))
    .with(
      {
        videoParts: P.when(
          (s) =>
            s.urlVideo &&
            s.urlVideo.length > 0 &&
            typeof s.urlAudio === "undefined",
        ),
        collection: P.nullish,
      },
      () => (
        <video
          width="100%"
          controls
          poster={mediaRecord.previewDecode ?? undefined}
        >
          <source src={mediaRecord.videoParts.urlVideo} />
        </video>
      ),
    )
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
        videoParts: P.nullish,
        url: P.when((s) => typeof s === "string" && s.length > 0),
      },
      () => <MediaResourceImage mediaRecord={mediaRecord} />,
    )
    .with(
      {
        haveVideo: false,
        fileDecode: P.when((s) => typeof s === "string" && s.length > 0),
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
});
MediaResourceContent.displayName = "MediaResourceContent";
