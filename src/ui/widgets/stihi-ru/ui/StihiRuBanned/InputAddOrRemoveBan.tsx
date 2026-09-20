import { useEffect, useRef } from "react";
import { Button, Card, TextInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import classes from "./StihiRuBanned.module.css";

interface Props {
  /**
   * Выполнять операцию добавления?
   */
  operationAdd?: boolean;
}

/**
 * Добавление или удаление автора из списка заблокированных
 */
export const InputAddOrRemoveBan = ({ operationAdd }: Props) => {
  const [login, setLogin] = useInputState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    stihiRuBanAuthrorsStore: { addAuthor, removeAuthor },
  } = useStihiRuRootStore();

  const onClick = () => {
    if (operationAdd) addAuthor(login);
    else removeAuthor(login);
    inputRef.current?.focus();
  };

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <TextInput
        label={operationAdd ? "Добавить автора" : "Удалить автора"}
        placeholder="Ввести логин или ссылку на его профиль"
        value={login}
        onChange={setLogin}
        ref={inputRef}
      />
      <Button
        variant="filled"
        color={operationAdd ? "red" : "green"}
        disabled={login.trim().length === 0}
        onClick={onClick}
      >
        {operationAdd ? "Добавить" : "Удалить"}
      </Button>
    </Card>
  );
};
