import { HStack, Heading, Text, VStack } from "native-base";

export const HistoryCard = () => {
  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      w="full"
      bgColor="gray.600"
      px={5}
      py={4}
      mb={3}
      rounded="md"
    >
      <VStack flex={1}> 
        <Heading
          color="white"
          fontFamily="heading"
          fontSize="md"
          textTransform="capitalize"
          numberOfLines={1}
        >
          Costas
        </Heading>
        <Text
          color="gray.100"
          fontFamily="body"
          fontSize="lg"
          mt={1}
          numberOfLines={1}
        >
          Puxada frontal
        </Text>
      </VStack>

      <Text color="gray.300" fontFamily="body" fontSize="md">
        08:56
      </Text>
    </HStack>
  );
};
