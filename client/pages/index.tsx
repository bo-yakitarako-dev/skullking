import type { NextPage } from 'next';
import Head from 'next/head';
import { PlayerCountSP } from '../components/start/PlayerCountSP';
import { Start } from '../components/start/Start';
import { StartPlayerList } from '../components/start/StartPlayerList';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>すかるきんぐ</title>
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
