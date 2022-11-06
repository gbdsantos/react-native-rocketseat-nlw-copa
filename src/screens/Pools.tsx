import { Icon, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";

import { Octicons } from "@expo/vector-icons";

export function Pools() {
  const { navigate } = useNavigation();

  return (
    <VStack bgColor="gray.900" flex={1}>
      <Header title="Meus boloões" />

      <VStack
        borderBottomColor="gray.600"
        borderBottomWidth={1}
        mb={4}
        mt={6}
        mx={5}
        pb={4}
      >
        <Button
          leftIcon={
            <Icon as={Octicons} color="black" name="search" size="md" />
          }
          onPress={() => navigate("find")}
          title="BUSCAR BOLÃO POR CÓDIGO"
        />
      </VStack>
    </VStack>
  );
}
