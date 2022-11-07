import { useState } from "react";

import { Heading, useToast, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import { api } from "../services/api";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');

  const { navigate } = useNavigation();
  const toast = useToast();

  async function handleJoinPoll() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          bgColor: "red.500",
          placement: "bottom",
          title: "Informe o código do bolão"
        });
      }

      await api.post("/pools/join", { code });

      toast.show({
        bgColor: "green.500",
        placement: "bottom",
        title: "Você entrou no bolão com sucesso"
      });

      navigate("polls");

    } catch (error) {
      console.log(error);
      setIsLoading(false);

      if (error.response?.data?.message === 'Poll not find.') {
        return toast.show({
          bgColor: "red.500",
          placement: "bottom",
          title: "Bolão não encontrado"
        });
      }

      if (error.response?.data?.message === 'You already joined this poll.') {
        return toast.show({
          bgColor: "red.500",
          placement: "bottom",
          title: "Você já está nesse bolão"
        });
      }

      toast.show({
        bgColor: "red.500",
        placement: "bottom",
        title: "Não foi possível encontrar o bolão"
      });

    }
  }

  return (
    <VStack bgColor="gray.900" flex={1}>
      <Header showBackButton title="Buscar por código" />

      <VStack alignItems="center" mt={8} mx={5}>
        <Heading
          color="white"
          fontFamily="heading"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de {"\n"} seu código
        </Heading>

        <Input
          autoCapitalize="characters"
          mb={2}
          onChangeText={setCode}
          placeholder="Qual o código do bolão?"
          value={code}
        />

        <Button
          isLoading={isLoading}
          onPress={handleJoinPoll}
          title="BUSCAR BOLÃO "
        />
      </VStack>
    </VStack>
  );
}
