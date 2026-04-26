import { Context, Telegraf } from "telegraf";

import { wait } from "@shared/lib/helpers/wait";

import { getExtFromUrl } from "./lib/helpers/getExtFromUrl";
import {
  type CombineAnimationType,
  type SendPictureToGroupsPayload,
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
          return wait();
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
        return wait();
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
}
