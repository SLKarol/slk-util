import { type PropsWithChildren, useEffect } from "react";
import { randomId } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import {
  SettingsFormProvider,
  useSettingsForm,
} from "../providers/ContextFormSettingsTunnel";

import { mapObjectValue } from "@renderer/widgets/lib/helpers";

/**
 * Форма настроек телеграм-бота
 */
export const SettingsForm = ({ children }: PropsWithChildren) => {
  const form = useSettingsForm({
    mode: "uncontrolled",
    initialValues: { telegramAdmin: "", telegramGroups: [], telegramToken: "" },
    validate: {
      telegramAdmin: (value: string) =>
        value.trim().length === 0 ? "Введите ID чата" : null,
      telegramGroups: {
        value: (value: string) =>
          value.trim().length === 0 ? "Введите ID чата" : null,
      },
      telegramToken: (value: string) =>
        value.trim().length === 0 ? "Введите токен" : null,
    },
  });

  useEffect(() => {
    window.electronAPI.fetchSettings();

    const unsubscribe = window.electronAPI.onReceiveSetting((settings) => {
      const { telegram } = settings;
      const telegramAdmin = telegram?.telegramAdmin ?? "";
      const telegramGroups = telegram?.telegramGroups ?? [];
      const telegramToken = telegram?.telegramToken ?? "";

      form.setValues({
        telegramAdmin,
        telegramGroups: telegramGroups.map((value) => ({
          key: randomId(),
          value,
        })),
        telegramToken,
      });
    });
    return unsubscribe;
  }, []);

  return (
    <SettingsFormProvider form={form}>
      <form
        onSubmit={form.onSubmit((formValues) => {
          if (formValues.telegramGroups.length === 0) {
            notifications.show({
              color: "red",
              message: "Не введены группы",
            });
            return;
          }

          const telegramGroups = [
            ...new Set(formValues.telegramGroups.map(mapObjectValue)),
          ];

          form.setFieldValue(
            "telegramGroups",
            telegramGroups.map((value) => ({
              key: randomId(),
              value,
            })),
          );

          window.electronAPI.saveSetting({
            key: "telegram",
            settings: {
              telegramToken: formValues.telegramToken,
              telegramGroups,
              telegramAdmin: formValues.telegramAdmin,
            },
          });
        })}
      >
        {children}
      </form>
    </SettingsFormProvider>
  );
};
SettingsForm.displayName = "SettingsForm";
