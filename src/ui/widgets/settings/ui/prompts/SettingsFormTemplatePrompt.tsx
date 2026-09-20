import { type PropsWithChildren, useEffect } from "react";
import { isNotEmpty } from "@mantine/form";

import {
  SettingsTemplatePromptFormProvider,
  useSettingsTemplatePromptForm,
} from "../../providers";

/**
 * Настройка / Форма настроек промптов
 */
export const SettingsFormTemplatePrompt = ({ children }: PropsWithChildren) => {
  const form = useSettingsTemplatePromptForm({
    mode: "uncontrolled",
    initialValues: { holiday: "" },
    validate: {
      holiday: isNotEmpty("Введите промпт, пожалуйста"),
    },
  });

  useEffect(() => {
    window.electronAPI.fetchSettings();

    const unsubscribe = window.electronAPI.onReceiveSetting((settings) => {
      form.setValues({
        holiday: settings.templatesPrompts?.holiday ?? "",
      });
    });
    return unsubscribe;
  }, []);

  return (
    <SettingsTemplatePromptFormProvider form={form}>
      <form
        onSubmit={form.onSubmit((formValues) => {
          window.electronAPI.saveSetting({
            key: "templatesPrompts",
            settings: formValues,
          });
        })}
      >
        {children}
      </form>
    </SettingsTemplatePromptFormProvider>
  );
};
