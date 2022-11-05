import { Heading, VStack } from "native-base";
import { Header } from "../components/Header";

import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Find() {
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
        <Input mb={2} placeholder="Qual o código do bolão?" />

        <Button title="BUSCAR BOLÃO " />
      </VStack>
    </VStack>
  );
}
