import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/table';
import { useRecoilValue } from 'recoil';
import {
  playerIdState,
  playersState,
  roundOverPlayersState,
  turnPlayerSelector,
} from '../../modules/state';

type Props = {
  sum?: boolean;
};

const Information: React.FC<Props> = ({ sum = false }) => {
  const ownId = useRecoilValue(playerIdState);
  const currentPlayers = useRecoilValue(playersState);
  const roundOverPlayers = useRecoilValue(roundOverPlayersState);
  const turnPlayer = useRecoilValue(turnPlayerSelector);

  const players = sum ? currentPlayers : roundOverPlayers;
  return (
    <TableContainer border="1px solid white" borderRadius="16px" padding={4}>
      <Table variant="simple" size={sum ? 'sm' : 'md'}>
        <Thead>
          <Tr color="white">
            <Th></Th>
            <Th color="white" fontFamily="'Hachi Maru Pop', cursive">
              予想数
            </Th>
            <Th color="white" fontFamily="'Hachi Maru Pop', cursive">
              勝利数
            </Th>
            <Th color="white" fontFamily="'Hachi Maru Pop', cursive">
              {sum ? '総' : ''}得点
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {players.map(({ playerId, name, prediction, victory, scores }) => {
            const score = sum
              ? scores.reduce((acc, curr) => acc + curr, 0)
              : scores[scores.length - 1] ?? 0;
            const sign = score > 0 ? '+' : '';
            const playerColor = playerId === ownId ? 'green.300' : 'white';
            const color =
              playerId === turnPlayer?.playerId && sum
                ? 'red.300'
                : playerColor;
            return (
              <Tr key={playerId}>
                <Td color={color} fontFamily="'Hachi Maru Pop', cursive">
                  {name}
                </Td>
                <Td color={playerColor} fontFamily="'Hachi Maru Pop', cursive">
                  {prediction}
                </Td>
                <Td color={playerColor} fontFamily="'Hachi Maru Pop', cursive">
                  {victory}
                </Td>
                <Td color={playerColor} fontFamily="'Hachi Maru Pop', cursive">
                  {sign}
                  {score}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export { Information };
