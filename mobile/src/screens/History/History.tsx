import { HistoryCard } from "@components/HistoryCard/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader/ScreenHeader";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Heading, SectionList, Text, VStack, useToast } from "native-base";
import { useCallback, useState } from "react";

export const History = () => {
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);

      const response = await api.get("/history");

      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Não foi possível carregar o histórico dos exercícios."

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchHistory();
  }, []));

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {/* Histórico dos exercícios feitos */}
      <SectionList
        sections={exercises}
        keyExtractor={(item) => String(item.id)}
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
        renderItem={({ item }) => <HistoryCard data={item} />}
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
