import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { io } from 'socket.io-client';
import { StartPlayer } from '../state';
import { startPlayersState } from '../state';

const socket = io();

export const useSocket = () => {
  const setStartPlayers = useSetRecoilState(startPlayersState);
  useEffect(() => {
    socket.on('startPlayers', (players: StartPlayer[]) => {
      setStartPlayers(players);
    });
    return () => {
      socket.close();
    };
  }, [setStartPlayers]);
};
