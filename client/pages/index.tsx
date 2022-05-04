import type { NextPage } from 'next';
import Head from 'next/head';
import { PlayerCountSP } from '../components/start/PlayerCountSP';
import { Start } from '../components/start/Start';
import { StartPlayerList } from '../components/start/StartPlayerList';
import { useSessionPlayer } from '../modules/hooks/useSessionPlayer';
import { getServerSidePropsOnSession, SessionProps } from '../modules/session';

const Home: NextPage<SessionProps> = ({ playerId }) => {
  useSessionPlayer(playerId);
  return (
    <>
      <Head>
        <title>すかるきんぐ</title>
        <meta name="description" content="お前も神ゲーにならないか？" />
      </Head>
      <main>
        <Start />
      </main>
      <StartPlayerList />
      <PlayerCountSP />
    </>
  );
};

export default Home;

export const getServerSideProps = getServerSidePropsOnSession;
