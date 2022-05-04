import { Button } from '@chakra-ui/button';
import { Box, Text } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  nameState,
  playerIdState,
  startPlayersState,
} from '../../modules/state';
import { StartNameForm } from './StartNameForm';

const NameBox: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const name = useRecoilValue(nameState);
  const playerId = useRecoilValue(playerIdState);
  const players = useRecoilValue(startPlayersState);
  const [canEdit, setCanEdit] = useState(true);

  useEffect(() => {
    const player = players.find((p) => p.playerId === playerId);
    if (player !== undefined) {
      setCanEdit(false);
    }
  }, [playerId, players]);

  if (playerId === 0 || canEdit) {
    return <StartNameForm setCanEdit={setCanEdit} />;
  }
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Text color="white" fontSize="xl" textAlign="left">
        ( ・ω・)ﾉやあ、
        {isMobile && <br />}
        <Text as="span" color="green.300">
          {name}
        </Text>
      </Text>
      <Button marginLeft="2" size="sm" onClick={() => setCanEdit(true)}>
        名前変更
      </Button>
    </Box>
  );
};

export { NameBox };
