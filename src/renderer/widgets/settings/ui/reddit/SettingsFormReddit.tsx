import { type PropsWithChildren, useEffect } from "react";

import {
  SettingsRedditFormProvider,
  useSettingsRedditForm,
} from "../../providers";

/**
 * Настройка реддит / Контекст формы
 */
export const SettingsFormReddit = ({ children }: PropsWithChildren) => {
  const form = useSettingsRedditForm({
    mode: "uncontrolled",
    initialValues: {
      redditApiSecret: "",
      redditAppId: "",
      redditLimitRecords: 12,
      redditPassword: "",
      redditUserName: "",
    },
    validate: {
      redditApiSecret: (value) =>
        value.length < 5 ? "Введите api secrect" : null,
      redditAppId: (value) => (value.length < 2 ? "Введите App Id" : null),
      redditLimitRecords: (value) =>
        value < 10 ? "Введите число больше 10" : null,
      redditPassword: (value) => (value.length < 2 ? "Введите пароль" : null),
      redditUserName: (value) =>
        value.length < 2 ? "Введите имя пользователя" : null,
    },
  });

  useEffect(() => {
    window.electronAPI.fetchSettings();

    const unsubscribe = window.electronAPI.onReceiveSetting((settings) => {
      const { reddit } = settings;
      const redditApiSecret = reddit?.redditApiSecret ?? "";
      const redditAppId = reddit?.redditAppId ?? "";
      const redditLimitRecords = reddit?.redditLimitRecords ?? 12;
      const redditPassword = reddit?.redditPassword ?? "";
      const redditUserName = reddit?.redditUserName ?? "";

      form.setValues({
        redditApiSecret,
        redditAppId,
        redditLimitRecords,
        redditPassword,
        redditUserName,
      });
    });
    return unsubscribe;
  }, []);

  return (
    <SettingsRedditFormProvider form={form}>
      <form
        onSubmit={form.onSubmit((formValues) => {
          console.log("formValues :>> ", formValues);
          window.electronAPI.saveSetting({
            key: "reddit",
            settings: formValues,
          });
        })}
      >
        {children}
      </form>
    </SettingsRedditFormProvider>
  );
};
