import { Container, Paper, Title } from "@mantine/core";

import { StihiRuButtonLogin } from "./StihiRuButtonLogin";
import { StihiRuInfoLogin } from "./StihiRuInfoLogin";
import { StihiRuInputLogin } from "./StihiRuInputLogin";
import { StihiRuInputPassword } from "./StihiRuInputPassword";
import { StihiRuLoginDateExpires } from "./StihiRuLoginDateExpires";

export const StihiRuLogin = () => {
  return (
    <Container size={420} my={40}>
      <Title ta="center">Регистрация на stihi.ru</Title>
      <StihiRuInfoLogin />
      <StihiRuLoginDateExpires />

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <StihiRuInputLogin />
        <StihiRuInputPassword />

        <StihiRuButtonLogin />
      </Paper>
    </Container>
  );
};
