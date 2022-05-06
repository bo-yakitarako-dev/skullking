import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { io } from 'socket.io-client';
import { CardType } from '../../components/common/Card';
import {
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
    socket.on('playerInfo', (players: Player[]) => {
      setPlayers(players);
      updateByPlayers(players);
    });
    socket.on('startRound', () => {
      setGameStatus('playing');
      setStartSlider(true);
    });
    socket.on('nowPlaying', () => {
      setGameStatus('playing');
    });
    socket.on('tableCards', (cards: CardType[]) => {
      setTableCards(cards);
    });
    socket.on('finishGame', () => {
      setName('');
      setPlayerId(0);
      setGameStatus('ready');
      localStorage.removeItem('playerId');
      router.replace('/');
    });
  }, [updateByPlayers]); // eslint-disable-line react-hooks/exhaustive-deps
};
