import { GenerateReaction } from "./GenerateReaction";
import { MyMind } from "./MyMind";
import styles from "./Poem.module.css";
import { TextPoem } from "./TextPoem";

/**
 * Контейнер вывода текста стихотворения
 */
export const Poem = () => {
  return (
    <div className={styles.container}>
      <TextPoem />
      <MyMind />
      <GenerateReaction />
    </div>
  );
};
