/**
 * Базовая информация о медиа-ресурсе.
 */
export interface MediaSummary {
  /** Уникальный идентификатор медиа */
  id: string;
  /** Идентификатор источника видео */
  idVideoSource: string;
  /** Заголовок медиа */
  title: string;
  /** Основные изображения предпросмотра */
  previewImages: Partial<MediaPreview>;
  /** Название раздела или субреддита, если применимо */
  subReddit?: string;
  /** Флаг 18+ контента */
  over18: boolean;
  /** Признак наличия видео */
  haveVideo: boolean;
  /** Ссылки на части медиа */
  videoParts: VideoParts;
  /** Ширина медиа в пикселях */
  width?: number;
  /** Высота медиа в пикселях */
  height?: number;
  /** Имя файла скачанного видео */
  downloadedFileName: string;
  /** Пермалинк к теме или ресурсу */
  permalink?: string;
  /** Ссылка на медиа-ресурс */
  url?: string;
  /** Дата создания записи в формате JSON */
  created?: string;
  /** Список доступных субтитров */
  subtitles?: SubTitlesInformation[];
  /** Альбом с дополнительными изображениями */
  collection?: MediaAlbum;
  /** Список доступных форматов медиа */
  listFormats?: Map<string, number[]>;
  /** Признак отсутствия мультимедиа */
  noMedia?: boolean;
}

/**
 * Предпросмотр видео с метаданными его источника изображения.
 */
export interface MediaPreview {
  /** Декодированная строка превью, если есть */
  decoded: string;
  /** URL источника изображения предпросмотра */
  src: string;
  /** Ширина изображения в пикселях */
  width?: number;
  /** Высота изображения в пикселях */
  height?: number;
}

/**
 * Ссылки на части медиа-ресурса.
 */
export type VideoParts = {
  /** URL основного видео */
  urlVideo: string;
  /** URL отдельной аудиодорожки */
  urlAudio?: string;
};

/**
 * Метаинформация о субтитрах.
 */
export interface SubTitlesInformation {
  /** Базовый URL для загрузки субтитров */
  baseUrl: string;
  /** Код языка субтитров */
  languageCode: string;
  /** Название языка субтитров */
  languageName: string;
}

/**
 * Коллекция медиа-ресурсов, сгруппированных по идентификатору.
 */
export interface MediaAlbum {
  [K: string]: MediaAlbumContent;
}

/**
 * Описание одного элемента в альбоме медиа.
 */
export interface MediaAlbumContent {
  /** Идентификатор элемента альбома */
  id: string;
  /** Ширина изображения в пикселях */
  width: number;
  /** Высота изображения в пикселях */
  height: number;
  /** Данные изображения в формате base64 */
  data: string;
  /** URL изображения */
  url: string;
}

/**
 * Расширенный объект медиа-превью, включающий дополнительные параметры.
 */
export interface MediaSummaryPreview extends MediaSummary {
  /** Параметры предпросмотра */
  preview?: { enabled?: boolean; images: ImagePreview[] };
}

/**
 * Описание элемента изображения в списке предпросмотра.
 */
interface ImagePreview {
  /** Основной источник изображения */
  source: ImagePreviewSource;
  /** Доступные варианты разрешений */
  resolutions: ImagePreviewSource[];
  /** Дополнительные варианты изображения */
  variants: any;
  /** Идентификатор изображения */
  id: string;
}

/**
 * Описание одного источника изображения.
 */
interface ImagePreviewSource {
  /** URL изображения */
  url: string;
  /** Ширина изображения */
  width: number;
  /** Высота изображения */
  height: number;
}
