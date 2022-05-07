import { Button } from '@chakra-ui/button';
import { Box, Text } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { post } from '../modules/http';

const socket = io();

const SocketSample: React.FC = () => {
  const [message, setMessage] = useState('　');
  const [inputText, setInputText] = useState('');

  const handleInput = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  }, []);

  useEffect(() => {
    socket.on('message', (message: string) => {
      setMessage(message);
    });
    return () => {
      socket.close();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const send = useCallback(() => {
    post('/socket/message', { message: inputText });
    setInputText('');
  }, [inputText]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      minHeight="100vh"
    >
      <Text fontSize="2xl" fontWeight="bold">
        {message}
      </Text>
      <Textarea
        padding={2}
        marginY={4}
        width={240}
        value={inputText}
        onChange={handleInput}
        borderColor="green.400"
        _hover={{ borderColor: 'green.200' }}
      />
      <Button
        paddingY={4}
        width={128}
        fontSize="sm"
        color="gray.700"
        backgroundColor="white"
        borderWidth={1}
        borderColor="blue.400"
        onClick={send}
      >
        送信しよ...
      </Button>
    </Box>
  );
};

export { SocketSample };
