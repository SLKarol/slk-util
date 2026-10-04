import { SelectTypePrompt } from "./SelectTypePrompt";

import styles from "./PromptProps.module.css";
import { SelectModel } from "./SelectModel";

/**
 * Свойства промпта
 */
export const PromptProps = () => {
  return (
    <div className={styles.container}>
      <SelectModel />
      <SelectTypePrompt />
    </div>
  );
};
