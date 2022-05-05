import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { io } from 'socket.io-client';
import {
  gameStatusState,
  nameState,
  Player,
  playerIdState,
  playersState,
  startSliderState,
} from '../state';

const socket = io();

export const useSocket = () => {
  const setPlayers = useSetRecoilState(playersState);
  const setGameStatus = useSetRecoilState(gameStatusState);
  const setName = useSetRecoilState(nameState);
  const setStartSlider = useSetRecoilState(startSliderState);
  const setPlayerId = useSetRecoilState(playerIdState);

  const router = useRouter();

  useEffect(() => {
    socket.on('playerInfo', (players: Player[]) => {
      setPlayers(players);
    });
    socket.on('startRound', () => {
      setGameStatus('playing');
      setStartSlider(true);
    });
    socket.on('nowPlaying', () => {
      setGameStatus('playing');
    });
    socket.on('finishGame', () => {
      setGameStatus('ready');
      setPlayers([]);
      setName('');
      setPlayerId(0);
      localStorage.removeItem('playerId');
      router.replace('/');
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
