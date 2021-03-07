export function generateRoundsDefinition({ roundMatchUps }) {
  let previousRoundMatchUpsCount;
  let feedTop = true;

  const roundNumbers = Object.keys(roundMatchUps);
  const firstRoundMatchUpsCount = roundMatchUps[roundNumbers[0]].length;
  const roundsColumns = roundNumbers.map(key => {
    const roundNumber = parseInt(key);
    const matchUps = roundMatchUps[roundNumber];
    const matchUpsCount = matchUps.length;
    const columnMultiplier =
      Math.log2(firstRoundMatchUpsCount / matchUpsCount) + 1;

    const roundName = matchUps[0].roundName || `Round ${roundNumber}`;
    const definition = {
      matchUpsCount: matchUps.length,
      columnType: 'classic',
      columnMultiplier,
      roundNumber,
      roundName,
      matchUps,
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

    const getTargetRoundPosition = (roundPosition, sideNumber) =>
      (roundPosition - 1) * 2 + sideNumber;

    const previousRoundMatchUps =
      roundNumber > 1 && roundMatchUps[roundNumber - 1];
    matchUps.forEach(matchUp => {
      const { roundPosition } = matchUp;
      matchUp.sides.forEach((side, sideIndex) => {
        const sideNumber = sideIndex + 1;

        if (previousRoundMatchUps) {
          if (definition.feedTop) {
            if (sideNumber === 2) {
              side.sourceMatchUp = previousRoundMatchUps.find(
                matchUp => matchUp.roundPosition === roundPosition
              );
            }
          } else if (definition.feedBottom) {
            if (sideNumber === 1) {
              side.sourceMatchUp = previousRoundMatchUps.find(
                matchUp => matchUp.roundPosition === roundPosition
              );
            }
          } else {
            const targetRoundPosition = getTargetRoundPosition(
              roundPosition,
              sideNumber
            );
            side.sourceMatchUp = previousRoundMatchUps.find(
              matchUp => matchUp.roundPosition === targetRoundPosition
            );
          }
        }
      });
      return matchUp;
    });

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
      finalMatchUp: finalRound.matchUps[0],
      columnMultiplier: finalRound.columnMultiplier + 1,
      columnType: 'classic',
      roundName: 'Winner',
    };
    roundsDefinition.push(final);
  }

  return { roundsDefinition };
}
