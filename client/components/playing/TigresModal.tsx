import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { post } from '../../modules/http';
import { playerIdState, tigresCardIdState } from '../../modules/state';

const TigresModal: React.FC = () => {
  const playerId = useRecoilValue(playerIdState);
  const [tigresType, setCardType] = useState<'pirates' | 'escape'>('pirates');
  const [cardId, setTigresCardId] = useRecoilState(tigresCardIdState);

  const onClose = useCallback(() => setTigresCardId(0), []); // eslint-disable-line react-hooks/exhaustive-deps
  const onChange = useCallback((nextValue: string) => {
    setCardType(nextValue as 'pirates' | 'escape');
  }, []);

  const onSubmit = useCallback(() => {
    post('/api/useCard', { playerId, cardId, tigresType });
    onClose();
  }, [playerId, cardId, tigresType, onClose]);

  return (
    <Modal isOpen={cardId !== 0} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>てぃぐれすの選択</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RadioGroup onChange={onChange} value={tigresType}>
            <Box>
              <Radio value="pirates" size="lg" marginBottom="2">
                海賊
              </Radio>
              <br />
              <Radio value="escape" size="lg">
                逃走
              </Radio>
            </Box>
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onSubmit}>送信</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { TigresModal };
