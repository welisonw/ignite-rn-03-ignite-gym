import { HStack, Heading, Icon, Image, ScrollView, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import BodySVG from "@assets/body.svg";
import DumbbellSVG from "@assets/series.svg";
import RepetitionsSVG from "@assets/repetitions.svg";
import { Button } from "@components/Button/Button";

export const Exercise = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      {/* Cabeçalho screen exercício */}
      <VStack bgColor="gray.600" pt={16} px={8} pb={8}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            as={MaterialIcons}
            name="arrow-back"
            color="green.500"
            size={6}
          />
        </TouchableOpacity>

        <HStack alignItems="center" justifyContent="space-between" mt={4}>
          <Heading
            flexShrink={1}
            color="gray.100"
            fontFamily="heading"
            fontSize="xl"
          >
            Puxada frontal
          </Heading>

          <HStack alignItems="center">
            <BodySVG />
            <Text
              color="gray.200"
              fontFamily="body"
              fontSize="md"
              ml={1}
              textTransform="capitalize"
            >
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        {/* Imagem do exercício e informações séries/repetições */}
        <VStack p={8}>
          <Image
            source={{
              uri: "https://static.tuasaude.com/media/article/ll/ae/puxada-frontal_63648_l.webp",
            }}
            alt="Imagem do exercício"
            resizeMode="cover"
            w="full"
            h={80}
            rounded="lg"
            mb={3}
          />
          <VStack bgColor="gray.600" pb={4} px={6} rounded="md">
            <HStack alignItems="center" justifyContent="space-evenly" mt={5} mb={6}>
              <HStack alignItems="center">
                <DumbbellSVG />
                <Text color="gray.200" fontFamily="body" fontSize="lg" ml={2}>
                  3 séries
                </Text>
              </HStack>
        
              <HStack alignItems="center">
                <RepetitionsSVG />
                <Text color="gray.200" fontFamily="body" fontSize="lg" ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>
            <Button
              title="Marcar como realizado"
              variant="solid"
            />
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  );
};
