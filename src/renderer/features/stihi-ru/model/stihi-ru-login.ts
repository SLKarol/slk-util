import { action, computed, makeObservable, observable } from "mobx";

import { type AppSettingsStihiRu } from "@shared/lib/types/app-settings";

import { parseCookieExpires } from "@renderer/widgets/stihi-ru/lib/parseCookieExpiresTyped";

/**
 * Стор для управления данными авторизации на сайте stihi.ru.
 *
 * @remarks
 * Хранит логин, пароль и куки пользователя. Отслеживает состояние входа
 * и доступность кнопки отправки формы. Использует MobX для реактивности.
 */
export class StihiRuLoginStore {
  /**
   * Объект с текущими настройками авторизации.
   *
   * @observable
   */
  settings: AppSettingsStihiRu = {
    login: "",
    password: "",
    cookies: [],
  };

  constructor() {
    makeObservable(this, {
      // observable
      settings: observable,
      // action
      setSettings: action,
      setSettingsProp: action,
      // computed
      isLoggedIn: computed,
      uiButtonDisabled: computed,
      tokenExpiration: computed,
      tokenExpirationDate: computed,
    });
  }

  /**
   * Полностью заменяет объект настроек.
   *
   * @param settings - Новые данные авторизации.
   *
   * @action
   */
  setSettings = (settings: AppSettingsStihiRu) => {
    this.settings = settings;
  };

  /**
   * Проверяет, авторизован ли пользователь.
   *
   * @returns `true`, если есть логин, пароль и хотя бы одна кука.
   * @computed
   */
  get isLoggedIn() {
    return (
      Boolean(this.settings.login) &&
      Boolean(this.settings.password) &&
      Array.isArray(this.settings.cookies) &&
      this.settings.cookies.length > 0 &&
      this.tokenExpirationDate !== null &&
      this.tokenExpirationDate?.getTime() > new Date().getTime()
    );
  }

  /**
   * Устанавливает значение отдельного поля в настройках.
   *
   * @param prop - Ключ поля: 'login', 'password' или 'cookies'.
   * @param value - Новое значение (для кук — строка, которая превратится в массив).
   *
   * @remarks
   * Особое поведение для `cookies`: строка разбивается на массив символов.
   * Это временное решение — в реальности куки приходят массивом.
   *
   * @action
   */
  setSettingsProp = (prop: keyof AppSettingsStihiRu, value: string) => {
    const settings = { ...this.settings };

    switch (prop) {
      case "cookies":
        settings[prop] = Array.from(value);
        break;
      default:
        settings[prop] = value;
    }

    this.settings = settings;
  };

  /**
   * Определяет, нужно ли блокировать кнопку отправки регистрации.
   *
   * @returns `true`, если логин или пароль пустые.
   *
   * @computed
   */
  get uiButtonDisabled() {
    return this.settings.login === "" || this.settings.password === "";
  }

  /**
   * Срок действия токена
   */
  get tokenExpiration() {
    return this.tokenExpirationDate.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  /**
   * Срок действия токена.
   * Значение - Date
   */
  get tokenExpirationDate() {
    let dateExpiration: Date | null = null;

    for (const cookie of this.settings.cookies) {
      dateExpiration = parseCookieExpires(cookie);
      if (dateExpiration) break;
    }
    return dateExpiration;
  }
}
