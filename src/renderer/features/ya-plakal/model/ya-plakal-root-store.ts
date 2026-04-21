import { MediaPagerStore } from "@renderer-features/model/media-pager";

import { YaCollection } from "./ya-collection";
import { SelectMaterialStore } from "./ya-plakal-select-material";

/**
 * Корневое хранилище приложения для управления состоянием работы с "Ya plakal".
 *
 * Данное хранилище выступает в роли контейнера для других подчинённых хранилищ,
 * обеспечивая централизованный доступ к ним.
 */
export class YaPlakalRootStore {
  /**
   * Хранилище, отвечающее за логику выбора учебного материала.
   *
   * @remarks
   * Это хранилище управляет состоянием интерфейса и данными, связанными
   * с выбором материала для дальнейшей работы в модуле "Ya plakal".
   */
  selectMaterialStore: SelectMaterialStore;

  /**
   * Пагинатор
   */
  pager: MediaPagerStore;

  /**
   * Коллекция материалов
   */
  collection: YaCollection;

  /**
   * Создаёт экземпляр корневого хранилища.
   *
   * Инициализирует вложенные хранилища.
   */
  constructor() {
    this.selectMaterialStore = new SelectMaterialStore();
    this.pager = new MediaPagerStore();
    this.collection = new YaCollection();
  }
}
