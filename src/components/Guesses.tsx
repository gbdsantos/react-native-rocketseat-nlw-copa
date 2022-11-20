import { useEffect, useState } from "react";

import { Box, FlatList, useToast } from "native-base";

import { EmptyMyPoolList } from "./EmptyMyPoolList";
import { Game, GameProps } from "../components/Game";
import { Loading } from "./Loading";

import { api } from "../services/api";

interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ code, poolId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secondTeamPoints, setSecondTeamPoints] = useState("");

  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${poolId}/games`);
      setGames(response.data.games);

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

  async function handleGuessConfirm(gameId: string) {
    try {
      if(!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          bgColor: "red.500",
          placement: "bottom",
          title: "Informe o placar para do palpite"
        });
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        bgColor: "green.500",
        placement: "bottom",
        title: "Palpite realizado com sucesso!"
      });

      fetchGames();

    } catch (error) {
      console.log(error);

      toast.show({
        bgColor: "red.500",
        placement: "bottom",
        title: "Não foi possível enviar o palpite"
      });

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();

    console.log(games);
  }, [poolId]);

  if(isLoading) {
    return <Loading />
  }

  return (
    <FlatList
    data={games}
    keyExtractor={item => item.id}
    renderItem={({item}) => (
      <Game
      data={item}
      onGuessConfirm={() => handleGuessConfirm(item.id)}
      setFirstTeamPoints={setFirstTeamPoints}
      setSecondTeamPoints={setSecondTeamPoints}
      />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} /> }
    />
  );
}
