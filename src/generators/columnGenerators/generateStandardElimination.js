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

    const stackedMatchUpValues = matchUps.map(getStackedMatchUpValues).flat();
    const frames = getFrames(stackedMatchUpValues);

    return {
      round,
      matchUps,
      matchUpHeight,
      firstMatchUpHeight,
      frames,
    };
  }
}

function getFrames(values) {
  const firstFrame = [values.shift()];
  const frames = multiChunk(values, [3, 2]);
  frames.unshift(firstFrame);
  return frames;
}

function multiChunk(arr, [size, ...otherSizes]) {
  return arr.length
    ? [
        arr.slice(0, size),
        ...multiChunk(arr.slice(size), [...otherSizes, size]),
      ]
    : [];
}

function getStackedMatchUpValues(matchUp) {
  const { sides, schedule } = matchUp || {};
  const sideDetails = sides.map(side => {
    const scoreString = winningScoreString(side?.sourceMatchUp);
    return [
      { side, matchUpDetails: getMatchUpDetails(matchUp) },
      {
        scoreString,
        sourceMatchUpDetails: getMatchUpDetails(side?.sourceMatchUp),
      },
    ];
  });
  return [sideDetails[0], schedule, sideDetails[1]].flat();
}

function getMatchUpDetails(matchUp) {
  return (({ eventId, drawId, structureId, readyToScore, matchUpStatus }) => ({
    eventId,
    drawId,
    structureId,
    readyToScore,
    matchUpStatus,
  }))(matchUp || {});
}

function winningScoreString(matchUp) {
  if (matchUp?.winningSide) {
    if (matchUp.winningSide === 2) {
      return matchUp.score.scoreStringSide2 || '';
    } else {
      return matchUp.score.scoreStringSide1 || '';
    }
  }
}
