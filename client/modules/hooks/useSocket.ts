import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { io } from 'socket.io-client';
import {
  gameStatusState,
  nameState,
  Player,
  playerIdState,
  playersState,
} from '../state';

const socket = io();

export const useSocket = () => {
  const setPlayers = useSetRecoilState(playersState);
  const setGameStatus = useSetRecoilState(gameStatusState);
  const setName = useSetRecoilState(nameState);
  const [playerId, setPlayerId] = useRecoilState(playerIdState);

  const router = useRouter();

  useEffect(() => {
    socket.on('playerInfo', (players: Player[]) => {
      setPlayers(players);
      if (
        router.pathname !== '/' &&
        !players.some((player) => player.playerId === playerId)
      ) {
        router.push('/');
      }
    });
    socket.on('startRound', () => {
      setGameStatus('playing');
      router.replace('/predict');
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
    });
  }, [router, playerId]); // eslint-disable-line react-hooks/exhaustive-deps
};
