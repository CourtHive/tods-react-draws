export function generateRoundsDefinition({ roundMatchUps = {}, nameFilter }) {
  let feedTop = true;

  const roundProfile = Object.assign(
    {},
    ...Object.keys(roundMatchUps).map(roundNumber => {
      return {
        [roundNumber]: { matchUpsCount: roundMatchUps[roundNumber]?.length },
      };
    })
  );

  const roundNumbers = Object.keys(roundMatchUps).map(key => parseInt(key));
  roundNumbers.forEach(roundNumber => {
    if (
      roundProfile[roundNumber + 1] &&
      roundProfile[roundNumber + 1].matchUpsCount ===
        roundProfile[roundNumber].matchUpsCount
    ) {
      roundProfile[roundNumber + 1].feedRound = true;
    }
  });

  const firstRoundMatchUpsCount =
    (roundNumbers?.length && roundProfile[roundNumbers[0]].matchUpsCount) || 0;
  const roundsColumns = roundNumbers.map(roundNumber => {
    const currentRoundMatchUps = roundMatchUps[roundNumber];
    const matchUps = currentRoundMatchUps.filter(({ sides }) => {
      const participantNames = sides
        ?.map(({ participant }) => participant?.participantName?.toLowerCase())
        .filter(f => f);
      return (
        !nameFilter ||
        participantNames.find(
          participantName => participantName.indexOf(nameFilter) >= 0
        )
      );
    });
    const matchUpsCount = matchUps.length;
    const columnMultiplier =
      Math.log2(firstRoundMatchUpsCount / matchUpsCount) + 1;

    const roundName =
      (currentRoundMatchUps?.length && currentRoundMatchUps[0].roundName) ||
      `Round ${roundNumber}`;
    const definition = {
      matchUpsCount: matchUps.length,
      columnType: 'classic',
      columnMultiplier,
      roundNumber,
      roundName,
      matchUps,
    };

    if (roundProfile[roundNumber].feedRound) {
      if (feedTop) {
        definition.feedTop = true;
        feedTop = false;
      } else {
        definition.feedBottom = true;
        matchUps.forEach(matchUp =>
          Object.assign(matchUp, { feedBottom: true })
        );
        feedTop = true;
      }
    }

    const getSourceRoundPosition = ({
      roundNumber,
      roundPosition,
      sideNumber,
    }) => {
      return roundProfile[roundNumber].feedRound
        ? roundPosition
        : (roundPosition - 1) * 2 + sideNumber;
    };

    const previousRoundMatchUps =
      roundNumber > 1 && roundMatchUps[roundNumber - 1];
    matchUps.forEach(matchUp => {
      const { roundPosition } = matchUp;
      matchUp.sides.forEach((side, sideIndex) => {
        const sideNumber = sideIndex + 1;

        if (previousRoundMatchUps) {
          if (matchUp.feedRound) {
            // for feed rounds { sideNumber: 1 } is always the fed position
            if (sideNumber !== 1) {
              side.sourceMatchUp = previousRoundMatchUps.find(
                matchUp => matchUp.roundPosition === roundPosition
              );
            }
          } else {
            const sourceRoundPosiiton = getSourceRoundPosition({
              roundNumber,
              roundPosition,
              sideNumber,
            });
            const sourceMatchUp = previousRoundMatchUps.find(
              matchUp => matchUp.roundPosition === sourceRoundPosiiton
            );
            side.sourceMatchUp = sourceMatchUp;
          }
        }
      });
      return matchUp;
    });

    return definition;
  });

  const firstRoundMatchUps = roundMatchUps[roundNumbers[0]];
  const detailsColumn = {
    columnType: 'details',
    details: ['drawPosition'],
    columnMultiplier: 1,
    matchUps: firstRoundMatchUps,
    matchUpsCount: firstRoundMatchUps?.length || 0,
  };
  // const dividerColumn = { columnType: 'divider' };
  // const roundsDefinition = [detailsColumn, dividerColumn, ...roundsColumns];
  const roundsDefinition = [detailsColumn, ...roundsColumns];
  const finalRound = roundsColumns[roundsColumns.length - 1];
  if (finalRound?.matchUps?.length === 1) {
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
