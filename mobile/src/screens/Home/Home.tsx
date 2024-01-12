import { useEffect, useState } from "react";
import { FlatList, HStack, Heading, Text, VStack, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { HomeHeader } from "@components/HomeHeader/HomeHeader";
import { MuscleGroup } from "@components/MuscleGroup/MuscleGroup";
import { ExerciseCard } from "@components/ExerciseCard/ExerciseCard";

export const Home = () => {
  const [muscleGroups, setMuscleGroups] = useState<string[]>([]);
  const [activeMuscleGroup, setActiveMuscleGroup] = useState("antebraço");
  const [exercises, setExercises] = useState([
    "Puxada frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terra",
  ]);

  const toast = useToast();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function fetchGroups() {
    try {
      const response = await api.get("/groups");

      if (response.data) {
        setMuscleGroups(response.data);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Não foi possível carregar os grupos musculares."

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  function handleOpenExerciseDetails() {
    navigation.navigate("exercise");
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <VStack flex={1}>
      <HomeHeader />

      {/* Lista horizontal dos grupos musculares */}
      <FlatList
        data={muscleGroups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <MuscleGroup
            name={item}
            isActive={activeMuscleGroup === item}
            onPress={() => setActiveMuscleGroup(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        maxHeight={10}
      />

      <VStack flex={1} px={8}>
        {/* cabeçalho */}
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontFamily="heading" fontSize="md">
            Exercícios
          </Heading>
          <Text color="gray.200" fontFamily="body" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        {/* Lista dos exercícios */}
        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            pb: 20,
          }}
        />
      </VStack>
    </VStack>
  );
};
