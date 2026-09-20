import { type MediaRecordStore } from "@renderer-features/model/media-record";

/**
 * Интерфейс, представляющий запись медиа-ресурса.
 */
export interface MediaRecordUi extends MediaRecordStore {
  /**
   * Идентификатор.
   */
  id: string;
  /**
   * Выбран.
   */
  selected: boolean;
}

/**
 * Данные о выбранном медиа-ресурсе.
 */
export interface SelectedMediaData {
  /**
   * Предпросмотр.
   * Поскольку может быть постраничное листание в основной вкладке, то желательно сохранять превью.
   */
  preview: string;
  /**
   * Название.
   * todo можно его изменить .
   * А ещё это для редита подойдёт
   */
  title: string | null;
}
