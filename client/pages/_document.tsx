import { Box } from '@chakra-ui/layout';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="お前も神ゲーにならないか？" />
        </Head>
        <body>
          <Box fontFamily="'Hachi Maru Pop', cursive">
            <Main />
            <NextScript />
          </Box>
        </body>
      </Html>
    );
  }
}
