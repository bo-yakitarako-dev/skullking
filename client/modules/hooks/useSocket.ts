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
  StartPlayer,
} from '../state';
import { startPlayersState } from '../state';

const socket = io();

export const useSocket = () => {
  const setStartPlayers = useSetRecoilState(startPlayersState);
  const setPlayers = useSetRecoilState(playersState);
  const setGameStatus = useSetRecoilState(gameStatusState);
  const setName = useSetRecoilState(nameState);
  const setPlayerId = useSetRecoilState(playerIdState);

  const router = useRouter();

  useEffect(() => {
    socket.on('startPlayers', (players: StartPlayer[]) => {
      setStartPlayers(players);
    });
    socket.on('playerInfo', (players: Player[]) => {
      setPlayers(players);
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
    return () => {
      socket.close();
    };
  }, [
    setStartPlayers,
    setGameStatus,
    setPlayers,
    router,
    setName,
    setPlayerId,
  ]);
};
