import { useEffect, useState } from "react";
import { Share } from "react-native";

import { HStack, useToast, VStack } from "native-base";
import { useRoute } from "@react-navigation/native";

import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PoolCardProps } from "../components/PoolCard";

import { api } from "../services/api";
import { PoolHeader } from "../components/PoolHeader";

interface RouteParams {
  id: string;
}

export function Details() {
  const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">("guesses");
  const [isLoading, setIsLoading] = useState(true);
  const [pollDetails, setPollDetails] = useState<PoolCardProps>({} as PoolCardProps);

  const route = useRoute();
  const toast = useToast();

  const { id } = route.params as RouteParams;

  async function fetchPollDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${id}`);
      setPollDetails(response.data.pool);

    } catch (error) {
      console.log(error);

      toast.show({
        bgColor: "red.500",
        placement: "bottom",
        title: "Não foi possível carregar os detalhes do bolão"
      });

    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: pollDetails.code
    });
  }

  useEffect(() => {
    fetchPollDetails();
  }, [id]);

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <VStack bgColor="gray.900" flex={1}>
      <Header
        onShare={handleCodeShare}
        showBackButton
        showShareButton
        title={pollDetails.title}
      />

      {
        pollDetails._count.participants > 0 ?
          <VStack px={5} flex={1}>
            <PoolHeader data={pollDetails} />

            <HStack bgColor="gray.800" mb={5} p={1} rounded="sm">
              <Option
                isSelected={optionSelected === "guesses"}
                onPress={() => setOptionSelected("guesses")}
                title="Seus palpites"
              />
              <Option
                isSelected={optionSelected === "ranking"}
                onPress={() => setOptionSelected("ranking")}
                title="Ranking do grupo"
              />
            </HStack>
          </VStack>
          : <EmptyMyPoolList code={pollDetails.code} />
      }
    </VStack>
  );
}
