import { Container } from "@mantine/core";

import { BannedReport } from "./BannedReport";
import { InputAddOrRemoveBan } from "./InputAddOrRemoveBan";

/**
 * Компонент отображения заблокированных авторов.
 */
export const StihiRuBanned = () => {
  return (
    <Container size={420} my={40}>
      <BannedReport />
      <InputAddOrRemoveBan operationAdd />
      <InputAddOrRemoveBan />
    </Container>
  );
};
