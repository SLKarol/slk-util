import { Button } from "@mantine/core";

interface OpenPoemProps {
  /*_ Ссылка на внешний ресурс _*/
  href: string;
  /*_ Заголовок для отображения ссылки _*/
  title: string;
}

/**
 * Произведение / Название стихотворения, открывающееся при клике на него.
 */
export const OpenPoem = ({ href, title }: OpenPoemProps) => {
  const onClickTitle = () => {
    window.electronAPI.stihiOpenPoem(href);
  };

  return (
    <Button
      variant="transparent"
      color="indigo"
      onClick={onClickTitle}
      pl={0}
      pr={0}
    >
      {title}
    </Button>
  );
};
