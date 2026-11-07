import { observer } from "mobx-react-lite";
import { Skeleton } from "@mantine/core";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import classes from "./StihiRuListPoemsLoading.module.css";

/**
 * Компонент отображения загрузки списка произведений
 */
export const StihiRuListPoemsLoading = observer(() => {
  const {
    stihiRuPoemsStore: { loading },
  } = useStihiRuRootStore();

  if (loading)
    return (
      <div className={classes.container}>
        <Skeleton height="1rem" radius="xl" />
        <Skeleton height="1rem" radius="xl" />
        <Skeleton height="1rem" radius="xl" />
        <Skeleton height="1rem" radius="xl" />
        <Skeleton height="1rem" radius="xl" />
      </div>
    );

  return null;
});
StihiRuListPoemsLoading.displayName = "StihiRuListPoemsLoading";
