import { Image } from '@chakra-ui/image';
import { Box, Text } from '@chakra-ui/layout';

type Color =
  | 'green'
  | 'purple'
  | 'yellow'
  | 'black'
  | 'skullking'
  | 'pirates'
  | 'mermaid'
  | 'tigres'
  | 'escape'
  | 'treasure'
  | 'kraken';

export type CardType = {
  cardId: number;
  color: Color;
  strength: number;
};

type Props = {
  card: CardType;
  invalid?: boolean;
  onClick?: () => void;
};

const backgroundColor: { [key in Color]?: string } = {
  green: 'green.400',
  purple: 'purple.400',
  yellow: 'yellow.400',
  black: 'black',
  pirates: 'red.500',
  mermaid: 'cyan.300',
  escape: 'blue.500',
  treasure: 'yellow.100',
  kraken: 'red.800',
};

const gradientBackground: { [key in Color]?: [string, string] } = {
  skullking: ['yellow.400', 'black'],
  tigres: ['red.400', 'blue.400'],
};

const Card: React.FC<Props> = ({ card, invalid = false, onClick }) => {
  const { color } = card;
  const number = convertToNumber(card);
  const gradient = gradientBackground[color];

  return (
    <Box
      position="relative"
      width="90px"
      height="140px"
      border="6px solid white"
      borderRadius="16px"
      backgroundColor={backgroundColor[color]}
      bgGradient={
        gradient ? `linear(to-br, ${gradient[0]}, ${gradient[1]})` : undefined
      }
      display="flex"
      justifyContent="center"
      alignItems="center"
      transitionDuration="0.2s"
      transitionProperty="transform"
      onClick={invalid ? onClick : undefined}
      _after={
        invalid
          ? {
              content: '""',
              position: 'absolute',
              width: '90px',
              height: '140px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '16px',
              border: '6px solid rgba(0, 0, 0, 0.5)',
            }
          : undefined
      }
      _hover={{
        cursor: invalid ? 'not-allowed' : onClick ? 'pointer' : 'default',
        transform:
          invalid || onClick === undefined ? undefined : 'translateY(-16px)',
      }}
    >
      {number !== null ? (
        <Text
          fontFamily="Helvetica, sans-serif"
          color="white"
          fontWeight="bold"
          fontSize="48px"
        >
          {number}
        </Text>
      ) : (
        <Image
          alt={color}
          src={`/images/card/${color}.png`}
          filter="drop-shadow(0px 0px 2px white)"
        />
      )}
    </Box>
  );
};

export { Card };

const convertToNumber = ({ color, strength }: CardType) => {
  if (['green', 'purple', 'yellow'].includes(color)) {
    return strength;
  }
  if (color === 'black') {
    return strength - 14;
  }
  return null;
};
