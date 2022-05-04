import { GetServerSideProps } from 'next';
import nextSession from 'next-session';

export const getSession = nextSession();

export type SessionProps = { playerId: number };

export const getServerSidePropsOnSession: GetServerSideProps<SessionProps> =
  async ({ req, res }) => {
    const session = await getSession(req, res);
    const playerId = session?.playerId || 0;
    return {
      props: { playerId },
    };
  };
