import { type PropsWithChildren, useEffect } from "react";
import { isNotEmpty } from "@mantine/form";
import { randomId } from "@mantine/hooks";

import {
  SettingsTemplatePromptFormProvider,
  useSettingsTemplatePromptForm,
} from "../../providers";
import { mapObjectValue } from "@renderer/widgets/lib/helpers";

/**
 * Настройка / Форма настроек промптов
 */
export const SettingsFormTemplatePrompt = ({ children }: PropsWithChildren) => {
  const form = useSettingsTemplatePromptForm({
    mode: "uncontrolled",
    initialValues: {
      holiday: "",
      reviewOfNeuroPoems: "",
      reviewOfPoems: "",
      reviewOfPoorPoems: "",
      myMindAboutPoems: "",
      listOpenersPoemReview: [],
    },
    validate: {
      holiday: isNotEmpty("Введите промпт, пожалуйста"),
    },
  });

  useEffect(() => {
    window.electronAPI.fetchSettings();

    const unsubscribe = window.electronAPI.onReceiveSetting((settings) => {
      const listOpenersPoemReview =
        settings.templatesPrompts?.listOpenersPoemReview ?? [];

      form.setValues({
        holiday: settings.templatesPrompts?.holiday ?? "",
        reviewOfNeuroPoems: settings.templatesPrompts?.reviewOfNeuroPoems ?? "",
        reviewOfPoems: settings.templatesPrompts?.reviewOfPoems ?? "",
        reviewOfPoorPoems: settings.templatesPrompts?.reviewOfPoorPoems ?? "",
        myMindAboutPoems: settings.templatesPrompts?.myMindAboutPoems ?? "",
        listOpenersPoemReview: listOpenersPoemReview.map((value) => ({
          key: randomId(),
          value,
        })),
      });
    });
    return unsubscribe;
  }, []);

  return (
    <SettingsTemplatePromptFormProvider form={form}>
      <form
        onSubmit={form.onSubmit((formValues) => {
          const { listOpenersPoemReview, ...formReadyValues } = formValues;
          const listOpenersPoemReviewStrings = [
            ...new Set(formValues.listOpenersPoemReview.map(mapObjectValue)),
          ];
          form.setFieldValue(
            "listOpenersPoemReview",
            listOpenersPoemReviewStrings.map((value) => ({
              key: randomId(),
              value,
            })),
          );

          window.electronAPI.saveSetting({
            key: "templatesPrompts",
            settings: {
              ...formReadyValues,
              listOpenersPoemReview: listOpenersPoemReviewStrings,
            },
          });
        })}
      >
        {children}
      </form>
    </SettingsTemplatePromptFormProvider>
  );
};
