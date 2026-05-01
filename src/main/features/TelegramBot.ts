import { Context, Telegraf } from "telegraf";

import { wait } from "@shared/lib/helpers/wait";

import { getExtFromUrl } from "./lib/helpers/getExtFromUrl";
import {
  type CombineAnimationType,
  type FileInTelegram,
  type SendMediaRecordsGroupsPayload,
  type SendPicturesToGroup,
  type SendPictureToGroupsPayload,
  type SendVideoToGroupsPayload,
} from "./lib/types/telegram";

/**
 * Класс для работы с Telegram-ботом.
 */
export class TelegramBot {
  /**
   * Экземпляр Telegraf, управляющий ботом.
   */
  telegraf: Telegraf<Context> | null = null;

  constructor(token?: string) {
    if (token) this.telegraf = new Telegraf(token);
  }

  /**
   * Проверяет, запущен ли бот и валиден ли токен.
   */
  async checkIsRunning() {
    try {
      await this.telegraf?.telegram.getMe();
      return true; // Бот отвечает, токен валиден
    } catch {
      return false; // Бот не запущен, токен неверный или сеть недоступна
    }
  }

  /**
   * Отправляет изображение или GIF в указанные группы Telegram.
   * Сначала отправка происходит в административную группу (`tgAdmin`) по URL.
   * Затем, если файл успешно загружен, его копия отправляется в остальные группы (`tgGroups`)
   * с использованием `file_id` из Telegram, чтобы избежать повторной загрузки.
   *
   * @returns {Promise<boolean|undefined>} Возвращает `true`, если отправка прошла успешно.
   * Если бот не инициализирован — возвращает `undefined`.
   */
  async sendPictureToGroups({
    tgAdmin,
    tgGroups,
    title,
    url,
    waitSeconds,
  }: SendPictureToGroupsPayload) {
    if (!this.telegraf) return;
    // Получить из URL'a расширение файла
    const ext = getExtFromUrl(url) ?? "";

    if (ext !== "gif") {
      // Отправляется в первую группу
      const sendTgresult = await this.telegraf.telegram.sendPhoto(
        tgAdmin,
        { url },
        { caption: title },
      );
      // Если есть другие группы, то в них отправить ссылку на файл в облаке телеграмм
      const {
        photo: [{ file_id: fileId }],
      } = sendTgresult;
      // Отправить в остальные группы
      if (fileId) {
        const promises = tgGroups.map((group) => {
          this.telegraf?.telegram.sendPhoto(group.trim(), fileId, {
            caption: title,
          });
          return wait(waitSeconds);
        });
        await Promise.allSettled(promises);
      }

      return true;
    }

    // Отправляется gif
    const sendTgresult = await this.telegraf.telegram.sendAnimation(
      tgAdmin,
      { url },
      { caption: title },
    );
    // Если есть другие группы, то в них отправить ссылку на файл в облаке телеграмм
    let fileId = "";
    if ("animation" in sendTgresult) {
      fileId = sendTgresult.animation.file_id;
    } else {
      fileId = (sendTgresult as unknown as CombineAnimationType).video.file_id;
    }
    // Отправить в остальные группы
    if (fileId) {
      const promises = tgGroups.map((group) => {
        this.telegraf?.telegram.sendAnimation(group.trim(), fileId, {
          caption: title,
        });
        return wait(waitSeconds);
      });
      await Promise.allSettled(promises);
    }
  }

  /**
   * Изменяет токен бота и перезапускает его.
   * Перед сменой токена проверяется, работает ли текущий бот — если да, он останавливается.
   *
   * @param {string} newToken - Новый токен бота от BotFather.
   *
   * @returns {Promise<void>}
   */
  async changeToken(newToken: string) {
    const botRunning = await this.checkIsRunning();
    if (botRunning) {
      this.telegraf?.stop();
    }
    this.telegraf = new Telegraf(newToken);
    this.telegraf.launch();
  }

  async sendMediaRecordsToGroups({
    mediaRecords,
    tgAdmin,
    tgGroups,
    waitSeconds,
  }: SendMediaRecordsGroupsPayload) {
    if (!this.telegraf) return;
    // Отправить все файлы в админский чат и получить fileId
    const savedFiles = await Promise.allSettled(
      mediaRecords.map(({ title, url }) => {
        // Получить из URL'a расширение файла
        const ext = getExtFromUrl(url) ?? "";

        if (ext === "gif") {
          return this.telegraf?.telegram
            .sendAnimation(tgAdmin, url, {
              caption: title ?? undefined,
              protect_content: false,
              disable_notification: true,
            })
            .then((response) => {
              return { id: response.animation.file_id, title, animation: true };
            })
            .catch(() => false);
        }

        return this.telegraf?.telegram
          .sendPhoto(tgAdmin, url, {
            caption: title ?? undefined,
            protect_content: false,
            disable_notification: true,
          })
          .then((response) => {
            return { id: response.photo[0].file_id, title, animation: false };
          })
          .catch(() => false);
      }),
    ).then((listImgs) => {
      const files: FileInTelegram[] = [];
      listImgs.forEach((imgResult) => {
        if (
          imgResult.status === "fulfilled" &&
          typeof imgResult.value !== "boolean" &&
          imgResult.value
        ) {
          files.push({
            ...imgResult.value,
            title: imgResult.value.title ?? "",
          });
        }
      });
      return files;
    });

    // 1. Отправить с GIF
    const dataWithGif = savedFiles.filter((d) => d.animation);
    // 2. Отправить альбомы
    const dataWithoutGif = savedFiles.filter((d) => !d.animation);

    await this.sendPicturesToGroups({
      delay: waitSeconds,
      pictures: dataWithoutGif,
      telegramGropus: tgGroups,
    });
    await this.sendGifsToGroups({
      delay: 4,
      pictures: dataWithGif,
      telegramGropus: tgGroups,
    });
  }

  /**
   * Отправить несколько изображений в указанные группы Telegram с заданной задержкой между отправками.
   */
  private async sendPicturesToGroups({
    pictures,
    telegramGropus,
    delay,
  }: SendPicturesToGroup) {
    // Получить группу по 10 изображений
    const size = 10;
    // Получить массив из частей по size штук
    const mediaMessages: FileInTelegram[][] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < Math.ceil(pictures.length / size); i++) {
      const array = pictures.slice(i * size, i * size + size);
      // Подготовить эти 10 записей к отправке в телеграм
      mediaMessages[i] = [...array];
    }

    for (const group of telegramGropus) {
      for (const media of mediaMessages) {
        await wait(delay);
        await this.telegraf?.telegram.sendMediaGroup(
          group.trim(),
          media.map(({ id, title }) => ({
            type: "photo",
            media: id,
            caption: title,
          })),
          { protect_content: false },
        );
      }
    }
  }

  /**
   * Отправить несколько GIF в указанные группы Telegram с заданной задержкой между отправками.
   * Поскольку Telegram не поддерживает отправку нескольких GIF в одном сообщении, каждое GIF отправляется отдельно.
   */
  private async sendGifsToGroups({
    delay,
    pictures,
    telegramGropus,
  }: SendPicturesToGroup) {
    for (const group of telegramGropus) {
      for (const media of pictures) {
        await wait(delay);
        await this.telegraf?.telegram.sendAnimation(group.trim(), media.id, {
          caption: media.title,
          protect_content: false,
        });
      }
    }
  }

  /**
   * Отправить видео в указанные группы Telegram.
   */
  async sendVideoToGroups({
    tgAdmin,
    tgGroups,
    url,
    title,
    urlPreview,
  }: SendVideoToGroupsPayload) {
    if (!this.telegraf) return;
    // Отправляется в первую группу
    const sendTgresult = await this.telegraf.telegram.sendVideo(tgAdmin, url, {
      caption: title,
      thumbnail: urlPreview ? { url: urlPreview } : undefined,
    });

    // В телеграмм-группы отправить ссылку на файл в облаке телеграмм
    const {
      video: { file_id: fileId },
      message_id,
    } = sendTgresult;

    // Сделать копию в остальные группы
    if (fileId) {
      for (const group of tgGroups) {
        await wait(2);
        await this.telegraf.telegram.copyMessage(
          group.trim(),
          tgAdmin,
          message_id,
        );
      }
    }
  }
}
