import { IconBan } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

type Props = {
  authorId: string;
};

/**
 * Картинка? что автор забанен
 */
export const StihiRuRecordHeadPic = observer(({ authorId }: Props) => {
  const {
    stihiRuBanAuthrorsStore: { list },
  } = useStihiRuRootStore();
  if (list.has(authorId)) return <IconBan size={14} />;

  return null;
});
StihiRuRecordHeadPic.displayName = "StihiRuRecordHeadPic";
