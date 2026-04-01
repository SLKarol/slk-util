import { Button, Tooltip } from "@mantine/core";

/**
 * Кнопка запуска процесса открытия произведений.
 */
export const ButtonRunEnter = () => {
  const onClick = () => {
    console.log(window.electronAPI);
  };

  return (
    <Tooltip label="Запустить процесс открытия произведений. Пригласить так сказать.">
      <Button onClick={onClick}>Запустить</Button>
    </Tooltip>
  );
};
