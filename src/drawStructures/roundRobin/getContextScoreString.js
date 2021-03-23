export function getContextScoreString({ matchUp, sideNumber }) {
  const contextScoreString = !sideNumber
    ? ''
    : sideNumber === 1
    ? matchUp?.score?.scoreStringSide1
    : matchUp?.score?.scoreStringSide2;
  return { contextScoreString };
}
