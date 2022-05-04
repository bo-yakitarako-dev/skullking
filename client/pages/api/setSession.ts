import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../modules/session';

const setSession = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(403).json({ ok: false, message: 'POSTしなきゃね' });
    return;
  }
  const { playerId } = req.body;
  if (!playerId) {
    const message = 'playerIDを指定してほしかったんだぁ';
    res.status(400).json({ ok: false, message });
    return;
  }
  const session = await getSession(req, res);
  session.playerId = Number(playerId);
  res.status(200).json({ ok: true });
};

export default setSession;
