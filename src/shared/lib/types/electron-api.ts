import { type HasPrevNextPage } from "@shared/lib/types/htmlPageInfo";
import { type MediaSummaryPreview } from "@shared/lib/types/media";

import {
  type AppSettings,
  type AppSettingsWireGuardTunnel,
} from "./app-settings";
import { type Nullable } from "./common";
import { type WriteSettingsProps } from "./settings.type";
import { type IStatusAutoReadStihi } from "./stihi.types";
import { type IPRange } from "./tunnel";

/**
 * API для взаимодействия с Electron
 */
export interface ElectronAPI {
  /**
   * Задать обработчик ошибки из главного процесса
   */
  onErrorMain: (callback: (error: unknown) => void) => () => void;

  /**
   * Задать обработчик выбора пункта меню
   * @param callback функция-обработчик принимает URL
   * @returns Функцию- отписку от события
   */
  onSelectMenu: (callback: (url: string) => void) => () => void;

  /**
   * GET-запрос текстовой информации. Как правило это HTML.
   * @param url адрес url
   */
  fetchText: (url: string) => string;

  /**
   * Задать обработчик получения текстовой информации.
   * @param callback функция-обработчик принимает текстовую информацию, см. ReceiveText
   * @returns Функцию- отписку от события
   */
  onReceiveText: (callback: (receiveText: ReceiveText) => void) => () => void;

  /**
   * Запрос настроек.
   */
  fetchSettings: () => void;
  /**
   * Задать обработчик получения настроек.
   * @param callback функция-обработчик. Принимает AppSettings
   * @returns Функция- отписка от события
   */
  onReceiveSetting: (callback: (settings: AppSettings) => void) => () => void;

  /**
   * Сохранить значение настройки
   */
  saveSetting: (settings: WriteSettingsProps) => void;

  /**
   * Запрос списка забаненных авторов
   */
  fetchBanAuthors: () => void;

  /**
   * Задать обработчик получения списка забаненных авторов.
   * @param callback  функция-обработчик. Принимает массив строк
   * @returns Функция- отписка от события
   */
  onReceiveBanAuthors: (callback: (list: string[]) => void) => () => void;

  /**
   * Открыть произведение по ссылке на сайте stihi.ru в броузере
   * @param hrefPoem Ссылка на произведение, без указания сайта
   */
  stihiOpenPoem: (hrefPoem: string) => void;

  /**
   * Открыть все видимые произведение по ссылке на сайте stihi.ru в броузере
   * @param hrefsPoems Массив ссылок на произведения
   */
  stihiOpenAllPoems: (hrefsPoems: string[]) => void;

  /**
   * Добавить автора в список забаненных
   * @param author Логин автора
   */
  addBanAuthor: (author: string) => void;
  /**
   * Удалить автора из списка забаненных
   * @param author Логин автора
   */
  removeBanAuthor: (author: string) => void;

  /**
   * Открыть страницу автора по ссылке на сайте stihi.ru в броузере
   * @param authorId Id автора
   */
  stihiOpenAuthor: (authorId: string) => void;

  /**
   * Проверить имя программы браузера
   */
  checkBrowserProgramRun: (browserProgramName: string) => void;

  /**
   * Задать обработчик получения всплывашки об ошибке.
   * @param callback функция-обработчик принимает текстовую информацию, см. ReceiveText
   * @returns Функцию- отписку от события
   */
  onReceivePopErrorMessage: (callback: (message: string) => void) => () => void;

  /**
   * Задать обработчик получения всплывашки об ошибке.
   * @param callback функция-обработчик принимает текстовую информацию, см. ReceiveText
   * @returns Функцию- отписку от события
   */
  onReceivePopMessage: (callback: (message: string) => void) => () => void;

  /**
   * Задать обработчик получения результата операции над автором.
   * @param callback функция-обработчик принимает ReceiveOperationAuthort
   * @returns Функцию- отписку от события
   */
  onReceiveOperationAuthor: (
    callback: (data: ReceiveOperationAuthor) => void,
  ) => () => void;

  /**
   * Сохранить список забаненных авторов как список для Ublock Origin
   */
  saveBansAsUblock: () => void;

  /**
   * Начать авто-читку произведений. Стихи будут открываться в браузере.
   * @param stringDateTime Дата и время в виде строки, с которых начать авто-читку.
   */
  startStihiAutoRead: (stringDateTime: string) => void;

  /**
   * Запрос статуса авто-читки произведений.
   */
  requestStatusAutoReadStihi: () => void;

  receiveStatusAutoReadStihi: (
    callback: (statusAutoReadStihi: IStatusAutoReadStihi) => void,
  ) => () => void;

  /**
   * Остановить авто-читку произведений.
   */
  stopStihiAutoRead: () => void;

  /**
   * Получить строку статистики авто-читки от main процесса. Строка - возможно нужно будет как-то изменить этот тип.
   */
  onReceiveStihiAutoRead: (callback: (message: string) => void) => () => void;

  onReceiveStatisticBot: (
    callback: (message: ReceiveStatisticBotData) => void,
  ) => () => void;

  /**
   * Запуск настройки WireGuard.
   * Вызывается из клиента.
   */
  startTunnelSettings: (settings: StartTunnelSettingsPayload) => void;
  /**
   * Остановка настройки WireGuard.
   * Вызывается из главного процесса.
   */
  receiveStopTunnelSettins: (callback: () => void) => () => void;

  /**
   * Получить IP-адреса для домена
   */
  receiveDomainAddress: (
    callback: (record: ReceiveDomainAddressRecord) => void,
  ) => () => void;

  /**
   * Получить исключённые CIDR-диапазоны для IPv4 и IPv6
   */
  receiveCalculateCidrs: (
    callback: (record: ReceiveCalculateCidrs) => void,
  ) => () => void;

  /**
   * Получить строку лога работы расчёта CIDR
   */
  receiveCalculateCidrsLog: (
    callback: (record: ReceiveCalculateCidrsLog) => void,
  ) => () => void;

  /**
   * Сохранить настройки туннеля
   */
  saveTunnelSettings: (settings: StartTunnelSettingsPayload) => void;

  /**
   * Скачать медиа-ресурсы из темы ЯП
   * @param url адрес темы
   */
  fetchYaPlakalTopic: (url: string) => void;

  /**
   * Ответ о медиа-инфо о яп-топике
   */
  receiveYaPlakalTopic: (
    callback: (yapTopic: IreceiveYaPlakalTopic) => void,
  ) => () => void;

  /**
   * Ответ о медиа-ресурсе из яп-топика
   */
  receiveYaPlakalTopicMedia: (
    callback: (response: IreceiveYaPlakalTopicMedia) => void,
  ) => () => void;

  /**
   * Запустить выбор каталога для сохранения медиа-файлов, загружаемых через приложение.
   */
  changeSaveVideoDirectory: () => void;

  /**
   * Сохранить медиа-файл, загружаемый через приложение, в выбранный каталог.
   * @param payload Параметры для сохранения медиа-файла, включая полный путь к файлу и URL источника.
   */
  saveMediaFile: (payload: SaveMediaFilePayload) => void;

  /**
   * Отправить картинку через Telegram-бота.
   */
  telegramBotSendPicture: (payload: TelegramBotSendPicturePayload) => void;

  /**
   * Отправить группу мультимедиа-ссылок через Telegram-бота.
   */
  telegramBotSendGroup: (payload: TelegramBotSendPicturePayload[]) => void;

  /**
   * Отправить видео через Telegram-бота.
   */
  telegramBotSendVideo: (payload: TelegramBotSendVideoPayload) => void;

  /**
   * Изменить токен Telegram-бота.
   * @param newToken Новый токен
   */
  telegramBotChangeToken: (newToken: string) => void;

  /**
   * Работа по отправке группы мультимедиа-ссылок через Telegram-бота завершена
   */
  telegramBotSendGroupFinish: (callback: () => void) => () => void;
}

/**
 * Получение текстовой информации
 */
export interface ReceiveText {
  /**
   * Параметр запроса. Как правило это URL.
   */
  requestParam: unknown;
  /**
   * Текстовая информация. Как правило это HTML.
   **/
  textContent: string;
}

/**
 * Результат операции над автором: добавление в бан или удаление из бана
 */
export interface ReceiveOperationAuthor {
  /**
   * true - автор добавлен в бан, false - автор удалён из бана
   */
  add: boolean;
  /**
   * Логин автора
   */
  author: string;
}

/**
 * Интерфейс, описывающий данные статистики бота, получаемые в процессе рендера.
 *
 * Объекты, соответствующие этому интерфейсу, используются для передачи
 * информации о событиях бота, включая временну́ю метку и текст сообщения.
 */
export interface ReceiveStatisticBotData {
  /**
   * Дата и время события в формате ISO строки.
   *
   * Представляет момент времени, когда было зафиксировано событие.
   * Пример: `"2023-11-20T14:30:45.123Z"`.
   */
  date: string;

  /**
   * Текстовое сообщение, содержащее информацию о событии или действии бота.
   *
   * Может включать сведения о типе операции, результате, ошибках и т.д.
   */
  message: string;
}

/**
 * Интерфейс, описывающий структуру данных, передаваемых при событии получения IP-адреса для домена.
 *
 * Используется в IPC-коммуникации между Electron-приложением и фронтендом для сопоставления доменного имени
 * с соответствующим диапазоном IP-адресов (например, IPv4 или IPv6).
 */
export interface ReceiveDomainAddressRecord {
  /**
   * Доменное имя, для которого был получен IP-адрес.
   *
   * @example 'example.com'
   */
  domain: string;

  /**
   * Диапазоны IP-адресов, разделённые по версиям протокола.
   */
  address: IPRange;
}

/**
 * Интерфейс данных, передаваемых при получении списка исключённых CIDR-диапазонов.
 *
 * Используется для передачи результата вычисления сетевых исключений для IPv4 и IPv6.
 */
export interface ReceiveCalculateCidrs {
  /**
   * Список IPv4 CIDR-диапазонов, которые должны быть исключены из маршрутов.
   * Пример: ['0.0.0.0/0', '185.32.248.0/22']
   */
  ipv4Excluded: string[];

  /**
   * Список IPv6 CIDR-диапазонов, которые должны быть исключены из маршрутов.
   * Пример: ['::/0', '2a00:bdc0:c000::/35']
   */
  ipv6Excluded: string[];
}

/**
 * Тип настроек WireGuard без поля `allowedIPs`.
 * Используется, когда нужно передать конфигурацию туннеля без списка разрешённых IP.
 */
export type AppSettingsWireGuardTunnelWithoutAllowedIPs = Omit<
  AppSettingsWireGuardTunnel,
  "allowedIPs"
>;

/**
 * Параметры для начала настройки туннеля WireGuard.
 * Наследует все поля конфигурации туннеля без `allowedIPs` и добавляет флаг
 * управления исключением доменов из VPN.
 */
export interface StartTunnelSettingsPayload extends Omit<
  AppSettingsWireGuardTunnel,
  "allowedIPs"
> {
  /** Флаг включения исключения доменов из VPN */
  methodExcludeDomainsFromVpn: boolean;
}

/**
 * Запись лога работы расчёта CIDR-диапазонов.
 */
export interface ReceiveCalculateCidrsLog {
  /** Метка времени события в миллисекундах */
  dateTime: number;
  /** Текст лога расчёта CIDR */
  log: string;
}

/**
 * Ответ от main-процесса с информацией о медиа из темы YaPlakal.
 */
export interface IreceiveYaPlakalTopic {
  /** Список найденных медиа-превью */
  mediaInfo: Partial<MediaSummaryPreview>[];
  /** Страницы темы: информация о наличии предыдущей/следующей страницы */
  pages: HasPrevNextPage;
}

export interface IreceiveYaPlakalTopicMedia {
  /** ID медиа-ресурса */
  id: string;
  /** Локальный путь к скачанному файлу */
  filePath: string;
  /** Локальный путь к превью */
  previewFilePath: string | null;
  /**
   * Декодированные данные файла
   */
  fileDecode: string | null;
  /**
   * Декодированные данные превью
   */
  previewDecode: string | null;
}

/**
 * Параметры сохранения медиа-файла
 */
export interface SaveMediaFilePayload {
  /**
   * URL-адрес медиа-ресурса
   */
  url: string;
}

export interface TelegramBotSendPicturePayload {
  /** Подпись к картинке */
  title?: Nullable<string>;
  /** URL картинки */
  url: string;
}

export interface TelegramBotSendVideoPayload extends TelegramBotSendPicturePayload {
  urlPreview?: string;
}
