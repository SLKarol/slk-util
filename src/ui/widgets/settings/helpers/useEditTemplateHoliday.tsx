import { useEffect } from "react";
import { useInputState } from "@mantine/hooks";

/**
 * Хук для редактирования шаблона вывода инфы о празднике
 **/
export const useEditTemplateHoliday = () => {
  const [templateHoliday, setTemplateHoliday] = useInputState("");

  useEffect(() => {
    window.electronAPI.fetchSettings();

    const unsubscribeReceiveSetting = window.electronAPI.onReceiveSetting(
      (data) => {
        setTemplateHoliday(data.templateHoliday);
      },
    );

    return () => {
      unsubscribeReceiveSetting();
    };
  }, []);

  const onClickSaveTemplateHoliday = () => {
    window.electronAPI.saveSetting({
      key: "templateHoliday",
      settings: templateHoliday,
    });
  };

  return { templateHoliday, setTemplateHoliday, onClickSaveTemplateHoliday };
};
