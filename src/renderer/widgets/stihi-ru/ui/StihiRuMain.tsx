import { Flex } from "@mantine/core";

import { StihiRuButtonGetRandom } from "./buttons/StihiRuButtonGetRandom";
import { StihiRuButtonLoadList } from "./buttons/StihiRuButtonLoadList";
import { StihiRuButtonLoadSelected } from "./buttons/StihiRuButtonLoadSelected";
import { ListVerse } from "./ListVerse/ListVerse";
import { StihiRuCalendar } from "./StihiRuCalendar";
import { StihiRuListLinks } from "./StihiRuListLinks";
import { StihiRuListRandomeNumber } from "./StihiRuListRandomeNumber";

import styles from "./StihiRuMain.module.css";

export const StihiRuMain = () => {
  return (
    <>
      <Flex>
        <div>
          <StihiRuCalendar />
          <StihiRuButtonLoadList />
        </div>
        <StihiRuListLinks />
      </Flex>
      <Flex gap="md" mt="lg">
        <StihiRuButtonGetRandom />
        <StihiRuButtonLoadSelected />
      </Flex>
      <div className={styles.listPoems}>
        <StihiRuListRandomeNumber />
        <div className={styles.block}>
          <ListVerse />
        </div>
      </div>
    </>
  );
};
