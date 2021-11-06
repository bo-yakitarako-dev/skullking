import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { post } from '../../modules/http';
import { nameState, playerIdState } from '../../modules/state';

type NameForm = {
  name: string;
};

type Props = {
  setCanEdit: Dispatch<SetStateAction<boolean>>;
};

const StartNameForm: React.FC<Props> = ({ setCanEdit }) => {
  const [value, setStoreName] = useRecoilState(nameState);
  const [playerId, setStorePlayerId] = useRecoilState(playerIdState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameForm>({
    mode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: false,
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setStoreName(event.target.value);
    },
    [setStoreName],
  );

  const errorMessage = useMemo(() => {
    if (errors.name?.types?.required) {
      return '名前が空白だと死んじゃう病';
    }
    if (errors.name?.types?.maxLength) {
      return '10文字超えると死んじゃう病';
    }
    return '　'; // 文字無いとDOMの高さ変わっちゃってブレるのでなんか書いとけ
  }, [errors.name]);

  const isValidName = typeof errors.name === 'undefined';

  const onSubmit: SubmitHandler<NameForm> = async ({ name }) => {
    if (playerId === 0) {
      const param = { name };
      const res = await post<{ playerId: number }>('/api/createPlayer', param);
      if (res.ok) {
        setStorePlayerId(res.playerId);
        setCanEdit(false);
      }
    } else {
      const param = { name, playerId };
      const res = await post<{ name: string }>('/api/renamePlayer', param);
      if (res.ok) {
        setStoreName(res.name);
        setCanEdit(false);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" width="fit-content" marginX="auto">
        <Box width="fit-content">
          <Input
            {...register('name', {
              required: true,
              maxLength: 10,
              value,
              onChange,
            })}
            placeholder="名前を入力"
            color="white"
            width="52"
            maxWidth="52"
          />
          <Text
            color="red.400"
            textAlign="left"
            fontSize="xs"
            paddingLeft="2"
            marginTop="0.5"
          >
            {errorMessage}
          </Text>
        </Box>
        <Button type="submit" marginLeft="4" disabled={!isValidName}>
          登録
        </Button>
      </Box>
    </form>
  );
};

export { StartNameForm };
