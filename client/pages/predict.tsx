import Head from 'next/head';
import { Flex, Heading, VStack } from '@chakra-ui/layout';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { CardType } from '../components/common/Card';
import { HandList } from '../components/prediction/HandList';
import { Order } from '../components/prediction/Order';
import { Player, playersState } from '../modules/state';
import { PredictForm } from '../components/prediction/PredictForm';

const cards: CardType[] = [
  { cardId: 1, color: 'green', strength: 1 },
  { cardId: 2, color: 'purple', strength: 7 },
  { cardId: 3, color: 'yellow', strength: 10 },
  { cardId: 4, color: 'black', strength: 28 },
  { cardId: 5, color: 'skullking', strength: 80 },
  { cardId: 6, color: 'pirates', strength: 60 },
  { cardId: 7, color: 'mermaid', strength: 60 },
  { cardId: 8, color: 'tigres', strength: 60 },
  { cardId: 9, color: 'kraken', strength: 0 },
  { cardId: 10, color: 'escape', strength: 0 },
  { cardId: 11, color: 'treasure', strength: 0 },
];

const players: Player[] = [
  {
    playerId: 1,
    name: 'おほぉの人',
    hand: [cards[0], cards[1], cards[2], cards[3], cards[4], cards[5]],
    prediction: -1,
    victory: 0,
    scores: [],
  },
  {
    playerId: 2,
    name: 'たえこおばさん',
    hand: [cards[4], cards[5], cards[6]],
    prediction: -1,
    victory: 0,
    scores: [],
  },
  {
    playerId: 3,
    name: '凍ったたまごっち',
    hand: [cards[8], cards[9], cards[10]],
    prediction: -1,
    victory: 0,
    scores: [],
  },
];

const Predict: React.FC = () => {
  const setPlayers = useSetRecoilState(playersState);
  useEffect(() => {
    setPlayers(players);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <Head>
        <title>勝利数を予想しようね</title>
      </Head>
      <VStack height="100vh" justifyContent="center">
        <Heading
          fontFamily="'Hachi Maru Pop', cursive"
          marginBottom={12}
          color="white"
        >
          勝利数を予想しよう
        </Heading>
        <Flex gridGap={8}>
          <HandList />
          <Order />
        </Flex>
        <PredictForm />
      </VStack>
    </>
  );
};

export default Predict;
