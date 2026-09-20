import { DatePickerInput, DatesProvider } from "@mantine/dates";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";

import { useRootStore } from "@renderer/providers/useRootStore";

/**
 * Компонент для ввода даты обхода на странице входа
 */
export const EnterPageInputData = observer(() => {
  const {
    trackerStihiStore: { dateValue, setDateValue },
  } = useRootStore();

  return (
    <DatesProvider settings={{ locale: "ru" }}>
      <DatePickerInput
        label="Выберете дату обхода, меньше текущего дня"
        placeholder="Выбрать дату"
        value={dateValue}
        onChange={setDateValue}
        maxDate={dayjs().add(-1, "day").toDate()}
        valueFormat="DD MMM YYYY"
      />
    </DatesProvider>
  );
});

EnterPageInputData.displayName = "EnterPageInputData";
