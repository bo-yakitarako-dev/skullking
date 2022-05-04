import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { io } from 'socket.io-client';
import { nameState, playerIdState, StartPlayer } from '../state';
import { startPlayersState } from '../state';

const socket = io();

export const useSocket = () => {
  const setStartPlayers = useSetRecoilState(startPlayersState);
  const [playerId] = useRecoilState(playerIdState);
  const setPlayerName = useSetRecoilState(nameState);
  useEffect(() => {
    socket.on('startPlayers', (players: StartPlayer[]) => {
      setStartPlayers(players);
      console.log(players);
    });
    return () => {
      socket.close();
    };
  }, [setStartPlayers, setPlayerName, playerId]);
};
