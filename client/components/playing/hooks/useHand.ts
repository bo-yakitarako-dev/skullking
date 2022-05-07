import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { post } from '../../../modules/http';
import {
  includeColorInHandSelector,
  playerIdState,
  tableCardsState,
  turnPlayerSelector,
} from '../../../modules/state';
import { CardType } from '../../common/Card';

export const useHand = () => {
  const playerId = useRecoilValue(playerIdState);
  const tableCards = useRecoilValue(tableCardsState);
  const includeColor = useRecoilValue(includeColorInHandSelector);
  const turnPlayer = useRecoilValue(turnPlayerSelector);

  const onClickCard = useCallback(
    ({ cardId }: CardType) =>
      () => {
        const params = { playerId, cardId };
        post('/api/useCard', params);
      },
    [playerId],
  );

  const isValid = useCallback(
    (card: CardType) => {
      if (turnPlayer?.playerId !== playerId) {
        return false;
      }
      return !includeColor || isValidColor(card, tableCards);
    },
    [playerId, includeColor, tableCards, turnPlayer],
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

export const getCurrentColor = (tableCards: CardType[]) => {
  for (const { color } of tableCards) {
    if (colors.includes(color)) {
      return color;
    }
  }
  return null;
};
