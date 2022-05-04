import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import { SocketProvider } from '../components/SocketProvider';
import { InvalidSP } from '../components/InvalidSP';

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window !== 'undefined' && window.innerWidth < 990) {
    return (
      <ChakraProvider>
        <InvalidSP />
      </ChakraProvider>
    );
  }
  return (
    <RecoilRoot>
      <ChakraProvider>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
}
