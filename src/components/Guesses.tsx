import { useEffect, useState } from "react";

import { Box, FlatList, useToast } from "native-base";

import { Game, GameProps } from "../components/Game";

import { api } from "../services/api";

interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secondTeamPoints, setSecondTeamPoints] = useState("");

  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${poolId}/games`);
      setGames(response.data);

    } catch (error) {
      console.log(error);

      toast.show({
        bgColor: "red.500",
        placement: "bottom",
        title: "Não foi possível carregar os jogos"
      });

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  return (
    <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <Game
          data={item}
          onGuessConfirm={() => {}}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
        />
      )}
    />
  );
}
