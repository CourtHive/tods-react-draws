import { factoryConstants } from 'tods-competition-factory';
const {
  RETIRED,
  WALKOVER,
  DOUBLE_WALKOVER,
  SUSPENDED,
  ABANDONED,
  DEFAULTED,
  CANCELLED,
  INCOMPLETE,
  NOT_PLAYED,
  DEAD_RUBBER,
} = factoryConstants?.matchUpStatusConstants;

const shortCodes = {
  [RETIRED]: 'RET',
  [WALKOVER]: 'WO',
  [DOUBLE_WALKOVER]: 'WO/WO',
  [SUSPENDED]: 'SUS',
  [ABANDONED]: 'Abandoned',
  [DEFAULTED]: 'Def',
  [CANCELLED]: 'Cancelled',
  [INCOMPLETE]: 'Inc',
  [NOT_PLAYED]: 'Not played',
  [DEAD_RUBBER]: 'Dead rubber',
};

export function getContextScoreString({ dictionary, matchUp, sideNumber }) {
  const scoreString =
    sideNumber === 1
      ? matchUp?.score?.scoreStringSide1
      : sideNumber === 2
      ? matchUp?.score?.scoreStringSide2
      : '';
  const matchUpStatus = matchUp?.matchUpStatus;
  const statusCode =
    (dictionary && dictionary[matchUpStatus]) ||
    shortCodes[matchUpStatus] ||
    '';
  const isWalkover = matchUpStatus === WALKOVER;
  const isLosingSide =
    sideNumber && matchUp?.winningSide && matchUp.winningSide !== sideNumber;
  const winIndicator = isWalkover && (isLosingSide ? ' (-)' : ' (+)');
  const contextScoreString =
    (scoreString || '') +
    (statusCode && ` ${statusCode}`) +
    (winIndicator || '');
  const highlightLosingSide = isLosingSide && isWalkover;
  return { contextScoreString, highlightLosingSide };
}
