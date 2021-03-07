export function generateRoundsDefinition({ roundMatchUps }) {
  let previousRoundMatchUpsCount;
  let feedTop = true;

  const roundNumbers = Object.keys(roundMatchUps);
  const firstRoundMatchUpsCount = roundMatchUps[roundNumbers[0]].length;
  const roundsColumns = roundNumbers.map(roundNumber => {
    const previousRoundMatchUps =
      roundNumber > 1 && roundMatchUps[roundNumber - 1];
    const matchUps = roundMatchUps[roundNumber].map(matchUp => {
      matchUp.sides.forEach(side => {
        if (previousRoundMatchUps && side?.participantId) {
          side.sourceMatchUp = previousRoundMatchUps.find(matchUp =>
            matchUp.drawPositions.includes(side.drawPosition)
          );
        }
      });
      return matchUp;
    });
    const matchUpsCount = matchUps.length;
    const columnMultiplier =
      Math.log2(firstRoundMatchUpsCount / matchUpsCount) + 1;
    const definition = {
      matchUps,
      columnMultiplier,
      matchUpsCount: matchUps.length,
      columnType: 'classic',
      roundName: `Round ${roundNumber}`,
      roundNumber,
    };

    if (matchUpsCount === previousRoundMatchUpsCount) {
      if (feedTop) {
        definition.feedTop = true;
        feedTop = false;
      } else {
        definition.feedBottom = true;
        feedTop = true;
      }
    }
    previousRoundMatchUpsCount = matchUpsCount;

    return definition;
  });

  const firstRoundMatchUps = roundMatchUps[roundNumbers[0]];
  const detailsColumn = {
    columnType: 'details',
    details: ['drawPosition'],
    columnMultiplier: 1,
    matchUps: firstRoundMatchUps,
    matchUpsCount: firstRoundMatchUps.length,
  };
  const dividerColumn = { columnType: 'divider' };
  const roundsDefinition = [detailsColumn, dividerColumn, ...roundsColumns];
  const finalRound = roundsColumns[roundsColumns.length - 1];
  if (finalRound.matchUps.length === 1) {
    const final = {
      matchUpsCount: 0,
      columnMultiplier: finalRound.columnMultiplier + 1,
      columnType: 'classic',
      roundName: 'Final',
    };
    roundsDefinition.push(final);
  }

  return { roundsDefinition };
}
