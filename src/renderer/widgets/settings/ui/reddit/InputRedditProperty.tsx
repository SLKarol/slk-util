import { NumberInput, TextInput } from "@mantine/core";

import { useSettingsRedditFormContext } from "../../providers";

import { type AppSettingsReddit } from "@shared/lib/types/app-settings";

/**
 * Свойства компонента ввода настройки Reddit.
 *
 * @interface InputRedditPropertyProps
 * @property {keyof AppSettingsReddit} keyName - Ключ настройки из конфигурации Reddit,
 *          определяющий, какое поле будет отображено и с какими параметрами.
 */
interface InputRedditPropertyProps {
  /**
   * Ключ поля настроек Reddit, которое должно быть отображено.
   * Используется для получения соответствующего значения из формы
   * и установки метки (label).
   */
  keyName: keyof AppSettingsReddit;
}

/**
 * Универсальный компонент ввода для полей настроек Reddit.
 *
 * Отображает текстовое или числовое поле ввода в зависимости от типа настройки.
 * Метка (label) устанавливается на основе ключа `keyName`.
 * Компонент использует контекст формы `useSettingsRedditFormContext` для управления состоянием.
 *
 * Особенности:
 * - Для поля `redditLimitRecords` используется `NumberInput`.
 * - Для всех остальных полей используется `TextInput`.
 * - Каждое поле получает уникальный ключ через `form.key()`, чтобы корректно работать с Mantine-формами.
 *
 * @param {InputRedditPropertyProps} props - Свойства компонента.
 * @returns {JSX.Element} Поле ввода (числовое или текстовое) с меткой.
 */
export const InputRedditProperty = ({ keyName }: InputRedditPropertyProps) => {
  const form = useSettingsRedditFormContext();

  let label = "";
  switch (keyName) {
    case "redditApiSecret":
      label = "Reddit api secret";
      break;
    case "redditAppId":
      label = "App Id";
      break;
    case "redditLimitRecords":
      label = "Количество запрашиваемых новых записей";
      break;
    case "redditPassword":
      label = "Пароль пользователя в Reddit";
      break;
    case "redditUserName":
      label = "Имя пользователя в Reddit";
      break;
  }

  if (keyName === "redditLimitRecords")
    return (
      <NumberInput
        label={label}
        key={form.key("redditLimitRecords")}
        {...form.getInputProps("redditLimitRecords")}
      />
    );

  return (
    <TextInput
      label={label}
      key={form.key(keyName)}
      {...form.getInputProps(keyName)}
    />
  );
};
