import { Container, Flex, Text } from "@mantine/core";

export const CalculateSettings = () => {
  return (
    <Container m={0}>
      <Text>Вычислено:</Text>
      <Flex gap="1rem">
        <Text flex={1}>Строка</Text>
        <button>C</button>
      </Flex>
    </Container>
  );
};
