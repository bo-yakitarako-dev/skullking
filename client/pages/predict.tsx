import Head from 'next/head';
import { Flex, Heading, VStack } from '@chakra-ui/layout';
import { HandList } from '../components/prediction/HandList';
import { Order } from '../components/prediction/Order';
import { PredictForm } from '../components/prediction/PredictForm';

const Predict: React.FC = () => {
  return (
    <>
      <Head>
        <title>勝利数を予想しようね</title>
      </Head>
      <VStack minHeight="100vh" justifyContent="center">
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
