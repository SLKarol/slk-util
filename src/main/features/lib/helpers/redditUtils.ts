import type { Submission } from "snoowrap";
import type { Media } from "snoowrap/dist/objects/Submission";

import {
  type MediaAlbum,
  type MediaAlbumContent,
  type MediaSummaryPreview,
  type VideoParts,
} from "@shared/lib/types/media";

import { decodeImageUrlTo64 } from "./decodeImageTo64";
import { downloadAndCacheFile } from "./downloadFileToCacheDir";
import { urlExists } from "./fetch";
import { downloadGfycatInfo } from "./gfycat";
import { downloadImgurInfo } from "./imgur";
import { downloadRedGifsInfo } from "./redGifs";

/**
 * Дополненные данные из api reddit
 */
interface ExtendSubmission extends Submission {
  crosspost_parent_list: [{ secure_media: Media }];
  gallery_data?: { items: { media_id: string; id: string }[] };
  media_metadata: MediaMetadata;
}

/**
 * snoowrap не записал этот тип записи альбома, сделаю за них
 */
interface RedditGalleryItem {
  y: number;
  x: number;
  u: string;
}

interface GetMediaInfoFromMediaMetadataTPayload {
  status: string;
  e: string;
  m: string;
  id: string;
  o: RedditGalleryItem[];
  p: RedditGalleryItem[];
  s: RedditGalleryItem;
}

/**
 * Разобрать запись для вывода на экран
 */
export async function parseSubmissionInfo(
  submission: Submission,
): Promise<MediaSummaryPreview> {
  // Получить основное инфо
  const {
    id,
    title,
    preview,
    subreddit: { display_name: subRedditDisplayName },
    over_18: over18,
    secure_media: media,
    crosspost_parent_list: crosspostParentList,
    url,
    permalink,
    created_utc: createdUtc,
    gallery_data: galleryData,
    media_metadata: mediaMetadata,
  } = submission as ExtendSubmission;
  // media может быть не своё, а из репоста
  let videoMedia: Media | null = media;
  if (
    !videoMedia &&
    Array.isArray(crosspostParentList) &&
    crosspostParentList.length
  ) {
    videoMedia = crosspostParentList[0].secure_media;
  }
  const date = new Date(0);
  date.setUTCSeconds(createdUtc);

  // Если видео размещено на redgifs.com, то так взять инфу:
  if (videoMedia && "type" in videoMedia && videoMedia.type === "redgifs.com") {
    const {
      haveVideo,
      videoParts,
      height: h,
      width: w,
      previewImages,
    } = await downloadRedGifsInfo(url);
    return {
      id,
      haveVideo,
      videoParts,
      title,
      subReddit: subRedditDisplayName,
      over18,
      height: h,
      width: w,
      idVideoSource: "www.reddit.com",
      permalink,
      url,
      downloadedFileName: "",
      previewImages,
      preview,
      created: date.toJSON(),
    } as MediaSummaryPreview;
  }

  // Если видео на imgur, то так взять инфу:
  if (url.includes("imgur.com")) {
    const {
      haveVideo,
      videoParts,
      height: h,
      width: w,
      previewImages,
    } = await downloadImgurInfo(url);
    return {
      id,
      haveVideo,
      videoParts,
      title,
      subReddit: subRedditDisplayName,
      over18,
      height: h,
      width: w,
      idVideoSource: "www.reddit.com",
      permalink,
      url,
      downloadedFileName: "",
      previewImages,
      preview,
      created: date.toJSON(),
    } as MediaSummaryPreview;
  }

  // Если это из gfycat. то разобрать
  if (url.includes("gfycat")) {
    const {
      haveVideo,
      videoParts,
      height: h,
      width: w,
      previewImages,
    } = await downloadGfycatInfo(url);
    const imgSrc = {
      height: h ?? 0,
      width: w ?? 0,
      url: previewImages.src ?? "",
    };
    return {
      id,
      haveVideo,
      videoParts,
      title,
      subReddit: subRedditDisplayName,
      over18,
      height: h,
      width: w,
      idVideoSource: "www.reddit.com",
      permalink,
      url,
      downloadedFileName: "",
      previewImages,
      preview: {
        images: [
          {
            source: imgSrc,
            resolutions: [imgSrc],
            variants: {},
            id: `-${id}`,
          },
        ],
      },
      created: date.toJSON(),
    } as MediaSummaryPreview;
  }

  // Если это галерея, то разобрать, что в этой галерее
  if (galleryData && mediaMetadata) {
    const dataCollection = getMediaMetadataForImages(mediaMetadata);
    const firstImage = Object.values(dataCollection)[0];

    return {
      id,
      haveVideo: false,
      videoParts: { urlVideo: url },
      title,
      subReddit: subRedditDisplayName,
      over18,
      height: firstImage ? firstImage.height : null,
      width: firstImage ? firstImage.width : null,
      idVideoSource: "www.reddit.com",
      permalink,
      url,
      downloadedFileName: "",
      previewImages: {},
      preview,
      created: date.toJSON(),
      collection: dataCollection,
    } as MediaSummaryPreview;
  }

  // Попытки взять видео из других источников
  let height = 0;
  let width = 0;
  let dimensionPropName: "reddit_video" | "oembed" | "" = "";

  if (videoMedia && "reddit_video" in videoMedia) {
    dimensionPropName = "reddit_video";
  }
  if (videoMedia && "oembed" in videoMedia) {
    dimensionPropName = "oembed";
  }
  if (dimensionPropName) {
    width = ((videoMedia as Media)[dimensionPropName] as { width: number })
      .width;

    height = ((videoMedia as Media)[dimensionPropName] as { height: number })
      .height;
  }

  const videoParts = await getVideoUrl({ url, media: videoMedia });

  // В случае, если url содержит gif, то записать этот урл в preview Images
  // В случае, если url содержит gif, то записать этот урл в preview Images
  if (/.gif/i.test(url) && preview?.images?.[0]?.source) {
    preview.images[0].source.url = url;
  }
  const noMedia =
    !preview &&
    !videoParts &&
    !dimensionPropName &&
    !galleryData &&
    !mediaMetadata;

  return {
    id,
    haveVideo: checkHaveVideo(url, videoMedia as Media),
    videoParts,
    title,
    subReddit: subRedditDisplayName,
    over18,
    height,
    width,
    idVideoSource: "www.reddit.com",
    permalink,
    url,
    downloadedFileName: "",
    previewImages: { height, width },
    preview,
    created: date.toJSON(),
    noMedia,
  } as MediaSummaryPreview;
}

/**
 * Получить данные из альбомов для загрузки изображений
 */
function getMediaMetadataForImages(mediaMetadata: MediaMetadata): MediaAlbum {
  // Получить ключи из объекта
  const keys = Object.keys(mediaMetadata);
  // По этим ключам собрать данные по галереи
  return keys.reduce((acc, key) => {
    const record = getMediaInfoFromMediaMetadata(
      mediaMetadata[
        key as keyof typeof mediaMetadata
      ] as unknown as GetMediaInfoFromMediaMetadataTPayload,
    );
    if (record) acc[key] = record;
    return acc;
  }, {} as MediaAlbum);
}

/**
 * Разобрать данные по записи из альбома:
 * Если инвалид, вернуть null,
 * Иначе вернуть данные о изображении: размер, ссылку
 */
function getMediaInfoFromMediaMetadata(
  record: GetMediaInfoFromMediaMetadataTPayload,
): MediaAlbumContent | null {
  if (record.status === "valid" && record.e === "Image") {
    const {
      s: { u, x, y },
      id,
    } = record;
    return { data: "", height: y, id, url: u, width: x };
  }
  return null;
}

/**
 * @param {Object} record Запись из reddit
 * @param {string} record.url Ссылка на видео
 * @param {string} record.title Название видео
 * @param {Object} record.media Скомбинированная инфа о видео
 * @return {Promise} videoRecords
 */
async function getVideoUrl(
  record: Partial<Submission>,
): Promise<VideoParts | null> {
  const { url = "", media } = record;
  // Это gifv?
  if (url.match(/.(gifv)$/i)) {
    return { urlVideo: url.replace(".gifv", ".mp4") };
  }
  // В остальных случаях должен быть объект media
  if (!media) {
    return null;
  }

  // Это обычное видео?
  const fallbackUrl = media?.reddit_video?.fallback_url;

  if (fallbackUrl) {
    if (
      media.reddit_video &&
      "has_audio" in media.reddit_video &&
      !media.reddit_video.has_audio
    ) {
      return { urlVideo: fallbackUrl };
    }
    const urlVideo = fallbackUrl.split("?")[0];
    const fileName = urlVideo.substring(urlVideo.lastIndexOf("/") + 1);
    if (!fileName.startsWith("DASH_")) {
      return null;
    }
    const urlAudio = urlVideo.replace(fileName, "DASH_audio.mp4");
    const mediaExist = await urlExists(urlAudio);
    return { urlVideo, urlAudio: mediaExist ? urlAudio : undefined };
  }
  return null;
}

/**
 * Реддит-заметка содержит видео?
 */
export function checkHaveVideo(url: string, media: Media) {
  if (url.match(/.(gifv)$/i)) return true;
  if (!media) return false;
  const { type = "" } = media;
  if (type === "redgifs.com") return true;
  const fallbackUrl = media?.reddit_video?.fallback_url;
  if (fallbackUrl) {
    const urlVideo = fallbackUrl.split("?")[0];
    const fileName = urlVideo.substring(urlVideo.lastIndexOf("/") + 1);
    if (fileName.startsWith("DASH_")) {
      return true;
    }
  }
  return false;
}

/**
 * Загрузка изображений для коллекции/альбома
 */
export async function getImagesCollection({
  cacheDir,
  collection,
}: {
  cacheDir: string;
  collection: MediaAlbum;
}): Promise<MediaAlbum> {
  // Получить ключи из объекта
  const keys = Object.keys(collection);
  // По этим ключам собрать данные по галереи
  const data = await Promise.allSettled(
    keys.map((k) =>
      getMediaMetadataRecordContent({ cacheDir, collection: collection[k] }),
    ),
  );

  const re = data.reduce((acc, record) => {
    if (record.status === "rejected" || record.value === null) return acc;
    acc[record.value.id] = record.value;
    return acc;
  }, {} as MediaAlbum);
  return re;
}

/**
 * Непосредственная запись base64 записи альбома
 */
async function getMediaMetadataRecordContent({
  cacheDir,
  collection: { url, ...props },
}: {
  cacheDir: string;
  collection: MediaAlbumContent;
}): Promise<MediaAlbumContent> {
  const filePath = await downloadAndCacheFile({
    url,
    cacheDir,
  });
  const fileDecode = (await decodeImageUrlTo64(filePath)) ?? null;

  if (fileDecode) return { ...props, url, data: fileDecode };

  return { ...props, url };
}
