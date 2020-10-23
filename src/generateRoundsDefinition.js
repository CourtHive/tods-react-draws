export function generateRoundsDefinition({ roundMatchUps }) {
  let previousRoundMatchUpsCount;
  let feedTop = true;

  const roundKeys = Object.keys(roundMatchUps);
  const firstRoundMatchUpsCount = roundMatchUps[roundKeys[0]].length;
  const roundsColumns = roundKeys.map((key, i) => {
    const matchUps = roundMatchUps[key];
    const matchUpsCount = matchUps.length;
    const columnMultiplier =
      Math.log2(firstRoundMatchUpsCount / matchUpsCount) + 1;
    const roundNumber = i + 1;
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

  const firstRoundMatchUps = roundMatchUps[roundKeys[0]];
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
