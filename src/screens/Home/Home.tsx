import { HomeHeader } from "@components/HomeHeader/HomeHeader";
import { VStack } from "native-base";

export const Home = () => {
  return (
    <VStack flex={1}>
      <HomeHeader />
    </VStack>
  );
};
