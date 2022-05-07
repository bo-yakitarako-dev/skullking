import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { io } from 'socket.io-client';
import { CardType } from '../../components/common/Card';
import {
  GameStatus,
  gameStatusState,
  nameState,
  Player,
  playerIdState,
  playersState,
  roundOverPlayersState,
  roundState,
  tableCardsState,
} from '../state';
import { useStatusUpdate } from './useStatusUpdate';

const socket = io();

export const useSocket = () => {
  const setPlayers = useSetRecoilState(playersState);
  const setGameStatus = useSetRecoilState(gameStatusState);
  const setName = useSetRecoilState(nameState);
  const setPlayerId = useSetRecoilState(playerIdState);
  const setRound = useSetRecoilState(roundState);
  const setRoundOverPlayers = useSetRecoilState(roundOverPlayersState);
  const setTableCards = useSetRecoilState(tableCardsState);

  const toast = useToast();
  const router = useRouter();
  const updateByStatus = useStatusUpdate();

  useEffect(() => {
    socket.on('gameStatus', (gameStatus: GameStatus) => {
      setGameStatus(gameStatus);
      updateByStatus(gameStatus);
    });
    socket.on('playerInfo', (players: Player[]) => {
      setPlayers(players);
    });
    socket.on('startRound', (round: number) => {
      setRound(round);
    });
    socket.on('tableCards', (cards: CardType[]) => {
      setTableCards(cards);
    });
    socket.on('winner', (winner: Player) => {
      toast({
        title: `${winner.name} の勝ち！`,
        description: '次はおめぇからじゃい！',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    });
    socket.on('roundOverPlayers', (players: Player[]) => {
      setRoundOverPlayers(players);
    });
    socket.on('finishGame', () => {
      setName('');
      setPlayerId(0);
      localStorage.removeItem('playerId');
      router.replace('/');
    });
  }, [updateByStatus]); // eslint-disable-line react-hooks/exhaustive-deps
};
