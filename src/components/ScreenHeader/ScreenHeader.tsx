import { Center, Heading } from "native-base";

interface ScreenHeaderProps {
  title: string;
}

export const ScreenHeader = ({ title, ...props }: ScreenHeaderProps) => {
  return (
    <Center bgColor="gray.600" pt={20} pb={6}>
      <Heading color="gray.100" fontFamily="heading" fontSize="xl">
        {title}
      </Heading>
    </Center>
  );
};
