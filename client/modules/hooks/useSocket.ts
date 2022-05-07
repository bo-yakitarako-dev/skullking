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
  startSliderState,
  tableCardsState,
} from '../state';
import { usePlayerUpdate } from './usePlayerUpdate';

const socket = io();

export const useSocket = () => {
  const setPlayers = useSetRecoilState(playersState);
  const setGameStatus = useSetRecoilState(gameStatusState);
  const setName = useSetRecoilState(nameState);
  const setStartSlider = useSetRecoilState(startSliderState);
  const setPlayerId = useSetRecoilState(playerIdState);
  const setTableCards = useSetRecoilState(tableCardsState);

  const router = useRouter();
  const updateByPlayers = usePlayerUpdate();

  useEffect(() => {
    socket.on('gameStatus', (gameStatus: GameStatus) => {
      setGameStatus(gameStatus);
    });
    socket.on('playerInfo', (players: Player[]) => {
      updateByPlayers(players);
      setPlayers(players);
    });
    socket.on('startRound', () => {
      setStartSlider(true);
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
  }, [updateByPlayers]); // eslint-disable-line react-hooks/exhaustive-deps
};
