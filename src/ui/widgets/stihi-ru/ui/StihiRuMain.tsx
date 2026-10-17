import { Flex } from "@mantine/core";

import { StihiRuButtonGetRandom } from "./buttons/StihiRuButtonGetRandom";
import { StihiRuButtonLoadList } from "./buttons/StihiRuButtonLoadList";
import { StihiRuButtonLoadSelected } from "./buttons/StihiRuButtonLoadSelected";
import { ListVerse } from "./ListVerse/ListVerse";
import { StihiRuCalendar } from "./StihiRuCalendar";
import { StihiRuListLinks } from "./StihiRuListLinks";
import { StihiRuListSelectedNumbers } from "./StihiRuListSelectedNumbers";

import styles from "./StihiRuMain.module.css";

export const StihiRuMain = () => {
  return (
    <div className={styles.container}>
      <div>
        <StihiRuCalendar />
        <StihiRuButtonLoadList />
      </div>
      <StihiRuListLinks />
      <div className={styles.buttons}>
        <StihiRuButtonGetRandom />
        <StihiRuButtonLoadSelected />
      </div>
      <StihiRuListSelectedNumbers />
      <ListVerse />
    </div>
  );
};
