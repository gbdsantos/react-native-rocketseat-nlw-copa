import { useState } from "react";

import { Heading, Text, useToast, VStack } from "native-base";
import { Header } from "../components/Header";

import { Button } from "../components/Button";
import { Input } from "../components/Input";

import Logo from "../assets/logo.svg";

import { api } from "../services/api";

export function New() {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function handlePoolCreate() {
    if (!title.trim()) {
      return toast.show({
        bgColor: 'red.500',
        title: 'Informe um nome para o seu bolão',
        placement: 'top'
      });
    }

    try {
      setIsLoading(true);

      await api.post('/pools', {
        title: title.toUpperCase()
      });

      toast.show({
        bgColor: 'green.500',
        title: 'Bolão criado com sucesso!',
        placement: 'top'
      });

      setTitle('');

    } catch (error) {
      console.log(error);

      toast.show({
        bgColor: 'red.500',
        title: 'Não foi possível criar o bolão',
        placement: 'top'
      });

    } finally {
      setIsLoading(false);
    }

  }

  return (
    <VStack bgColor="gray.900" flex={1}>
      <Header showBackButton title="Criar novo bolão" />

      <VStack alignItems="center" mt={8} mx={5}>
        <Logo />

        <Heading
          color="white"
          fontFamily="heading"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa {"\n"} e compartilhe entre amigos
        </Heading>
        <Input
          mb={2}
          onChangeText={setTitle}
          placeholder="Qual nome do seu bolão?"
          value={title}
        />

        <Button
          isLoading={isLoading}
          onPress={handlePoolCreate}
          title="CRIAR MEU BOLÃO "
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" mt={4} px={10}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
