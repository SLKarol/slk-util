import "dayjs/locale/ru";

import { Calendar, DatesProvider } from "@mantine/dates";
import { observer } from "mobx-react-lite";

import { isFutureDate } from "../lib/isFutureData";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Вывод календаря
 */
export const StihiRuCalendar = observer(() => {
  const {
    calendarStore: { selectedDate, setSelectedDate },
    listChaptersStore: { loading },
  } = useStihiRuRootStore();

  return (
    <DatesProvider settings={{ locale: "ru", consistentWeeks: true }}>
      <Calendar
        getDayProps={(date) => ({
          selected: date === selectedDate,
          onClick: () => setSelectedDate(date),
          highlightToday: true,
          disabled: loading || isFutureDate(date),
        })}
      />
    </DatesProvider>
  );
});
StihiRuCalendar.displayName = "StihiRuCalendar";
