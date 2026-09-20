import {
  SelectHoliday,
  ShouldWriteAboutHolidayWithAICheckbox,
} from "@renderer/widgets/holidays/ui";
import { ListMedia } from "@renderer/widgets/shared/ui";
import {
  YaCountSelected,
  YaListPostMedia,
  YaToolbarSelected,
} from "@renderer/widgets/yaplakal/ui/post-material";

/**
 * Списки выбранного для отправки
 */
export const YaPost = () => {
  return (
    <>
      <YaCountSelected />
      <SelectHoliday />
      <ShouldWriteAboutHolidayWithAICheckbox />
      <YaToolbarSelected />
      <ListMedia>
        <YaListPostMedia />
      </ListMedia>
    </>
  );
};
