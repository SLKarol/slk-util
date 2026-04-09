import { Box, Container, Text, Title } from "@mantine/core";

/**
 * Список ip адресов для домена
 */
export const AddressForDomain = () => {
  return (
    <Box>
      <Title order={5}>ya.ru</Title>
      <Container>
        <Title order={6}>IPv4</Title>
        <Text pl="1rem">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          recusandae praesentium eveniet atque adipisci ipsam possimus
          consequatur, vel, voluptatem minus veniam itaque, reiciendis facilis
          labore velit omnis ratione quis consequuntur.
        </Text>
        <Title order={6}>IPv6</Title>
        <Text pl="1rem">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          recusandae praesentium eveniet atque adipisci ipsam possimus
          consequatur, vel, voluptatem minus veniam itaque, reiciendis facilis
          labore velit omnis ratione quis consequuntur.
        </Text>
      </Container>
    </Box>
  );
};
