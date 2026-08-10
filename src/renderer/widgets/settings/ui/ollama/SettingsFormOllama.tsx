import { type PropsWithChildren, useEffect } from "react";
import { isUrl } from "@mantine/form";

import {
  SettingsOllamaFormProvider,
  useSettingsOllamaForm,
} from "../../providers";

/**
 * Форма настроек Ollama
 */
export const SettingsFormOllama = ({ children }: PropsWithChildren) => {
  const form = useSettingsOllamaForm({
    mode: "uncontrolled",
    initialValues: { host: "", model: { holiday: "" } },
    validate: {
      host: isUrl("Введите полный адрес"),
    },
  });

  useEffect(() => {
    window.electronAPI.fetchSettings();

    const unsubscribe = window.electronAPI.onReceiveSetting((settings) => {
      form.setValues({
        host: settings.ollama?.host ?? "",
        model: { holiday: settings.ollama?.model?.holiday ?? "" },
      });
    });
    return unsubscribe;
  }, []);

  return (
    <SettingsOllamaFormProvider form={form}>
      <form
        onSubmit={form.onSubmit((formValues) => {
          window.electronAPI.saveSetting({
            key: "ollama",
            settings: formValues,
          });
        })}
      >
        {children}
      </form>
    </SettingsOllamaFormProvider>
  );
};
