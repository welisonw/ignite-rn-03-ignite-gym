import { HistoryCard } from "@components/HistoryCard/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader/ScreenHeader";
import { Heading, SectionList, Text, VStack } from "native-base";
import { useState } from "react";

export const History = () => {
  const [exercises, setExercises] = useState([
    {
      title: "28.08.22",
      data: ["Puxada Frontal", "Remada unilateral"],
    },
    {
      title: "26.08.22",
      data: ["Puxada Frontal"],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {/* Histórico dos exercícios feitos */}
      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderSectionHeader={({ section }) => (
          <Heading
            color="gray.200"
            fontFamily="heading"
            fontSize="md"
            mt={10}
            mb={3}
          >
            {section.title}
          </Heading>
        )}
        renderItem={({ item }) => <HistoryCard />}
        contentContainerStyle={
          !exercises.length && { flex: 1, justifyContent: "center" }
        }
        ListEmptyComponent={() => (
          <Text
            color="gray.100"
            fontFamily="body"
            fontSize="md"
            textAlign="center"
          >
            Não há exercícios registrados ainda.{"\n"}
            Vamos fazer exercícios hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
        px={6}
      />
    </VStack>
  );
};
