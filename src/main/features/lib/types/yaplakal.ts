/**
 * Описание ответа API Yaplakal для загрузки медиа-ресурсов.
 * Этот тип отражает структуру JSON-ответа от `https://api.yapfiles.ru/load/...`.
 */
export interface YaplakalApiResponse {
  /**
   * Данные плеера, содержащие метаданные медиа.
   */
  player: {
    /** Заголовок медиа */
    title: string;
    /** URL изображения-превью */
    poster: string;
    /** Основной URL видеофайла */
    file: string;
    /** HD-версия видеофайла или null */
    file_hd: string | null;
    /** Разрешение видео в формате `ширинаxвысота` */
    res: string;
  };
}
