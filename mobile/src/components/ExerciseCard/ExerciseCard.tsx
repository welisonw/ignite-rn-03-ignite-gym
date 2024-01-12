import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { api } from "@services/api";
import { MaterialIcons } from "@expo/vector-icons";

interface ExerciseCardProps extends TouchableOpacityProps {
  data: ExerciseDTO;
}

export const ExerciseCard = ({ data, ...props }: ExerciseCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.6} {...props}>
      <HStack
        alignItems="center"
        bgColor="gray.600"
        mb={3}
        p={2}
        pr={4}
        rounded="md"
      >
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          alt="Imagem do exercício"
          w={16}
          h={16}
          rounded="sm"
          mr={4}
        />

        <VStack flex={1}>
          <Heading color="white" fontFamily="heading" fontSize="lg">
            {data.name}
          </Heading>
          <Text
            color="gray.200"
            fontFamily="body"
            fontSize="sm"
            mt={1}
            numberOfLines={2}
          >
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={MaterialIcons} name="chevron-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
};
