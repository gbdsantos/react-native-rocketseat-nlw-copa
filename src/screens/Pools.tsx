import { useCallback, useState } from "react";

import { FlatList, Icon, useToast, VStack } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import { EmptyPoolList } from "../components/EmptyPoolList";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PoolCard, PoolCardProps } from "../components/PoolCard";

import { Octicons } from "@expo/vector-icons";

import { api } from "../services/api";

export function Pools() {
  const [isLoading, setIsLoading] = useState(true);
  const [polls, setPolls] = useState<PoolCardProps[]>([]);

  const { navigate } = useNavigation();
  const toast = useToast();

  async function fetchPools() {
    try {
      setIsLoading(true);
      const response = await api.get('pools');
      setPolls(response.data.pools);

    } catch (error) {
      console.log(error);
      toast.show({
        bgColor: "red.500",
        placement: "bottom",
        title: "Não foi possível carregar os bolões"
      });

      throw error;

    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchPools();
  }, []));

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

      {
        isLoading ? <Loading /> :
          <FlatList
            _contentContainerStyle={{ pb: 10 }}
            data={polls}
            keyExtractor={item => item.id}
            ListEmptyComponent={() => <EmptyPoolList />}
            px={5}
            renderItem={({ item }) => (
              <PoolCard
                data={item}
                onPress={() => navigate("details", { id: item.id })}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
      }
    </VStack>
  );
}
