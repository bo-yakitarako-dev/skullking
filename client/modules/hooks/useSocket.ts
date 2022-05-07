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
  tableCardsState,
} from '../state';
import { useStatusUpdate } from './useStatusUpdate';

const socket = io();

export const useSocket = () => {
  const setPlayers = useSetRecoilState(playersState);
  const setGameStatus = useSetRecoilState(gameStatusState);
  const setName = useSetRecoilState(nameState);
  const setPlayerId = useSetRecoilState(playerIdState);
  const setTableCards = useSetRecoilState(tableCardsState);

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
    socket.on('tableCards', (cards: CardType[]) => {
      setTableCards(cards);
    });
    socket.on('finishGame', () => {
      setName('');
      setPlayerId(0);
      localStorage.removeItem('playerId');
      router.replace('/');
    });
  }, [updateByStatus]); // eslint-disable-line react-hooks/exhaustive-deps
};
