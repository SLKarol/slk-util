import { SelectTypePrompt } from "./SelectTypePrompt";

import styles from "./PromptProps.module.css";

/**
 * Свойства промпта
 */
export const PromptProps = () => {
  return (
    <div className={styles.container}>
      <SelectTypePrompt />
    </div>
  );
};
