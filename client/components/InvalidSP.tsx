import { Box, Text } from '@chakra-ui/layout';

const InvalidSP: React.FC = () => {
  return (
    <Box
      backgroundColor="gray.900"
      width="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      color="white"
      textAlign="center"
    >
      <Text fontSize={64}>🙇‍♀️</Text>
      <br />
      スマホは未対応なのだ...
      <br />
      すまそん
    </Box>
  );
};

export { InvalidSP };
