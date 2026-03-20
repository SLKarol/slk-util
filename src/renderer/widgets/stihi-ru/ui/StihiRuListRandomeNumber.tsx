import { List } from "@mantine/core";

/**
 * Список случайных номеров произведений
 */
export const StihiRuListRandomeNumber = () => {
  return (
    <List listStyleType="none" flex={1}>
      <List.Item>Использовать клик и чек</List.Item>
      <List.Item>Install dependencies with yarn</List.Item>
      <List.Item>To start development server run npm start command</List.Item>
      <List.Item>
        Run tests to make sure your changes do not break the build
      </List.Item>
      <List.Item>Submit a pull request once you are done</List.Item>
    </List>
  );
};
