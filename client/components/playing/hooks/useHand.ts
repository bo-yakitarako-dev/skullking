import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import {
  playerIdState,
  tableCardsState,
  turnPlayerSelector,
} from '../../../modules/state';
import { CardType } from '../../common/Card';

export const useHand = () => {
  const playerId = useRecoilValue(playerIdState);
  const tableCards = useRecoilValue(tableCardsState);
  const turnPlayer = useRecoilValue(turnPlayerSelector);

  const onClickCard = useCallback(
    ({ cardId }: CardType) =>
      () => {
        const params = { playerId, cardId };
        console.log(params);
      },
    [playerId],
  );

  const isValid = useCallback(
    (card: CardType) => {
      if (turnPlayer?.playerId !== playerId) {
        return false;
      }
      return isValidColor(card, tableCards);
    },
    [playerId, tableCards, turnPlayer],
  );

  return { onClickCard, isValid };
};

const colors = ['green', 'purple', 'yellow', 'black'] as CardType['color'][];

const isValidColor = (card: CardType, tableCards: CardType[]) => {
  if (!colors.includes(card.color)) {
    return true;
  }
  const currentColor = getCurrentColor(tableCards);
  if (currentColor === null) {
    return true;
  }
  return card.color === currentColor;
};

const getCurrentColor = (tableCards: CardType[]) => {
  for (const { color } of tableCards) {
    if (colors.includes(color)) {
      return color;
    }
  }
  return null;
};
