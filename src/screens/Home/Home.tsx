import { useState } from "react";
import { FlatList, HStack, Heading, Text, VStack } from "native-base";
import { HomeHeader } from "@components/HomeHeader/HomeHeader";
import { MuscleGroup } from "@components/MuscleGroup/MuscleGroup";
import { ExerciseCard } from "@components/ExerciseCard/ExerciseCard";

export const Home = () => {
  const [muscleGroups, setMuscleGroups] = useState([
    "Costas",
    "Bíceps",
    "Tríceps",
    "Ombro",
  ]);
  const [activeMuscleGroup, setActiveMuscleGroup] = useState(muscleGroups[0]);
  const [exercises, setExercises] = useState([
    "Puxada frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terra",
  ]);

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
          renderItem={({ item }) => <ExerciseCard />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            pb: 20,
          }}
        />
      </VStack>
    </VStack>
  );
};
