import { HistoryDTO } from "@dtos/HistoryDTO";
import { HStack, Heading, Text, VStack } from "native-base";

interface HistoryCardProps {
  data: HistoryDTO;
};

export const HistoryCard = ({ data }: HistoryCardProps) => {
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
          {data.name}
        </Heading>
        <Text
          color="gray.100"
          fontFamily="body"
          fontSize="lg"
          textTransform="capitalize"
          mt={1}
          numberOfLines={1}
        >
          {data.group}
        </Text>
      </VStack>

      <Text
        color="gray.300"
        fontFamily="body"
        fontSize="md"      
      >
        {data.hour}
      </Text>
    </HStack>
  );
};
