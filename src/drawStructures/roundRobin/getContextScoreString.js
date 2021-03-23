export function getContextScoreString({ matchUp, sideNumber }) {
  const score = !sideNumber
    ? ''
    : sideNumber === 1
    ? matchUp?.score?.scoreStringSide1
    : matchUp?.score?.scoreStringSide2;
  return { score };
}
