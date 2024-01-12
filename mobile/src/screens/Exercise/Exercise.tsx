import { useEffect, useState } from "react";
import { HStack, Heading, Icon, Image, ScrollView, Text, VStack, useToast } from "native-base";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import BodySVG from "@assets/body.svg";
import DumbbellSVG from "@assets/series.svg";
import RepetitionsSVG from "@assets/repetitions.svg";
import { Loading } from "@components/Loading/Loading";
import { Button } from "@components/Button/Button";

interface RouteParamsProps {
  id: string;
}

export const Exercise = () => {
  const [exerciseDetails, setExerciseDetails] = useState<ExerciseDTO>({} as ExerciseDTO);
  const [isLoading, setIsLoading] = useState(true);
  const [sendingRegister, setSendingRegister] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();

  const toast = useToast();

  const { id } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      
      const response = await api.get(`/exercises/${id}`);
      console.log(response.data)

      if (response.data) {
        setExerciseDetails(response.data);
      }

    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Não foi possível carregar os detalhes do exercício."

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true);

      await api.post("/history", { exercise_id: id });

      toast.show({
        title : "Parabéns! Exercício registrado no seu histórico.",
        placement: "top",
        bgColor: "green.700",
      });

      navigation.navigate("history");
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Não foi possível registrar o exercício."

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [id]);

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
            {exerciseDetails.name}
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
              {exerciseDetails.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          {/* Imagem do exercício e informações séries/repetições */}
          <VStack p={8}>
            <Image
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exerciseDetails.demo}`,
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
                    {exerciseDetails.series} séries
                  </Text>
                </HStack>
          
                <HStack alignItems="center">
                  <RepetitionsSVG />
                  <Text color="gray.200" fontFamily="body" fontSize="lg" ml={2}>
                    {exerciseDetails.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>
              <Button
                title="Marcar como realizado"
                variant="solid"
                isLoading={sendingRegister}
                onPress={handleExerciseHistoryRegister}
              />
            </VStack>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
};
