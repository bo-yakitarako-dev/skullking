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
import { playersState } from '../../modules/state';

const Information: React.FC = () => {
  const players = useRecoilValue(playersState);
  return (
    <TableContainer border="1px solid white" borderRadius="16px" padding={4}>
      <Table variant="simple" size="sm">
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
              得点
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {players.map(({ playerId, name, prediction, victory, scores }) => {
            const score = scores.reduce((acc, curr) => acc + curr, 0);
            const sign = score > 0 ? '+' : '';
            return (
              <Tr key={playerId}>
                <Td color="white" fontFamily="'Hachi Maru Pop', cursive">
                  {name}
                </Td>
                <Td color="white" fontFamily="'Hachi Maru Pop', cursive">
                  {prediction}
                </Td>
                <Td color="white" fontFamily="'Hachi Maru Pop', cursive">
                  {victory}
                </Td>
                <Td color="white" fontFamily="'Hachi Maru Pop', cursive">
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
