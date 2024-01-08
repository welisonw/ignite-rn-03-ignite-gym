import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

interface ExerciseCardProps extends TouchableOpacityProps {}

export const ExerciseCard = ({ ...props }: ExerciseCardProps) => {
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
            uri: "https://static.tuasaude.com/media/article/ll/ae/puxada-frontal_63648_l.jpg",
          }}
          alt="Imagem do exercício"
          w={16}
          h={16}
          rounded="sm"
          mr={4}
        />

        <VStack flex={1}>
          <Heading color="white" fontFamily="heading" fontSize="lg">
            Puxada frontal
          </Heading>
          <Text
            color="gray.200"
            fontFamily="body"
            fontSize="sm"
            mt={1}
            numberOfLines={2}
          >
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon as={MaterialIcons} name="chevron-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
};
