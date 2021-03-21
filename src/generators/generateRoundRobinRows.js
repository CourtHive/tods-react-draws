export function generateRoundRobinRows({ roundMatchUps, participantResults }) {
  const allMatchUps = Object.values(roundMatchUps).flat();
  const groupedMatchUps = allMatchUps.reduce((grouped, matchUp) => {
    const { structureId } = matchUp || {};
    if (!grouped[structureId]) grouped[structureId] = [];
    grouped[structureId].push(matchUp);
    return grouped;
  }, {});

  const sum = arr => arr.reduce((a, b) => a + b);
  const matchUpColumnSort = (a, b) =>
    sum(a.drawPositions) - sum(b.drawPositions);
  const numericSort = (a, b) => a - b;

  const groupStructureIds = Object.keys(groupedMatchUps);
  const rows = groupStructureIds.map(groupStructureId => {
    const groupMatchUps = groupedMatchUps[groupStructureId];
    const structureName = groupMatchUps && groupMatchUps[0].structureName;
    const sides = groupMatchUps.map(({ sides }) => sides).flat();
    const drawPositions = groupMatchUps
      .reduce((drawPositions, matchUp) => {
        matchUp.drawPositions.forEach(drawPosition => {
          if (!drawPositions.includes(drawPosition))
            drawPositions.push(drawPosition);
        });
        return drawPositions;
      }, [])
      .sort(numericSort);

    const positionRows = drawPositions.map((drawPosition, rowIndex) => {
      const side = sides.find(side => side.drawPosition === drawPosition);
      const { participant, bye, qualifier } = side || {};
      const participantResult = participantResults.find(
        result => result.drawPosition === drawPosition
      )?.participantResult;
      const matchUps = groupMatchUps
        .filter(({ drawPositions }) => drawPositions.includes(drawPosition))
        .sort(matchUpColumnSort);
      matchUps.splice(rowIndex, 0, {});
      return {
        drawPosition,
        matchUps,
        participant,
        participantResult,
        qualifier,
        bye,
        rowIndex,
      };
    });
    const positionColumns = positionRows.map(
      ({ participant, bye, qualifier }, rowIndex) => ({
        participant,
        qualifier,
        bye,
        rowIndex,
      })
    );
    const headerRow = {
      structureName,
      positionColumns,
    };

    return [headerRow, ...positionRows];
  });

  return { rows };
}
