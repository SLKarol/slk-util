import { Textarea } from "@mantine/core";

/**
 * Ввод своих мысле по поводу прочитанного текста.
 */
export const MyMind = () => {
  return (
    <Textarea
      label="Моя мысль по всему прочитанному тексту"
      placeholder="Моя мысль по всему прочитанному тексту. Не обязательный элемент."
      autosize
      minRows={4}
      w="100%"
    />
  );
};
