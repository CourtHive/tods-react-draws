export function generateStandardElimination({ height, roundsDefinition }) {
  let priorFeedOffset = 0;
  const topMargin = roundsDefinition.find(r => r.feedTop) && height / 2;

  const columns = roundsDefinition.map((round, index) => {
    const matchUpsCount = round.matchUps?.length || round.matchUpsCount;
    return generateColumn({ matchUpsCount, round, index });
  });

  return columns;

  function calcHeight({ height, columnMultiplier }) {
    if (!columnMultiplier) return 0;
    return (
      height * Math.pow(2, columnMultiplier - 1) +
      Math.pow(2, columnMultiplier - 1) -
      1
    );
  }
  function calcFirstHeight({ height, columnMultiplier }) {
    if (!columnMultiplier) return 0;
    const multiplier =
      columnMultiplier > 1 ? Math.pow(2, columnMultiplier - 2) - 1 : 0;
    const base = height + height * multiplier;
    const offset = columnMultiplier > 1 ? height * 0.5 : 0;
    const borders = multiplier || 1;
    return base + offset + borders;
  }

  function generateColumn({ round }) {
    const { columnMultiplier, feedTop, feedBottom } = round;
    const matchUpHeight = calcHeight({ height, columnMultiplier });
    const feedOffset =
      priorFeedOffset +
      matchUpHeight * ((feedTop && -0.5) || (feedBottom && 0.5) || 0);
    priorFeedOffset = feedOffset;
    const firstMatchUpHeight =
      calcFirstHeight({ height, columnMultiplier }) +
      (topMargin || 0) +
      feedOffset;

    const matchUps = round.matchUps || [];
    return {
      round,
      matchUps,
      matchUpHeight,
      firstMatchUpHeight,
    };
  }
}
