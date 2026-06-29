import { Text } from "@mantine/core";
import { useParams } from "react-router";

export const SettingsHello = () => {
  const { setting = "" } = useParams();

  if (setting) return null;

  return <Text>Настройка приложения.</Text>;
};
