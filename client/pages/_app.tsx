import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { RecoilRoot } from 'recoil';
import { SocketProvider } from '../components/SocketProvider';
import { InvalidSP } from '../components/InvalidSP';
import { PlayerIdProvider } from '../components/PlayerIdProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <SocketProvider>
          <PlayerIdProvider>
            <Box display={{ base: 'block', md: 'none' }}>
              <InvalidSP />
            </Box>
            <Box
              display={{ base: 'none', md: 'block' }}
              backgroundColor="gray.900"
            >
              <Component {...pageProps} />
            </Box>
          </PlayerIdProvider>
        </SocketProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
}
