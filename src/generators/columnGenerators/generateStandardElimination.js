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

    const isFinal = round.finalMatchUp;
    const matchUps = round.matchUps || [];

    const stackedMatchUpValues = isFinal
      ? getFinalMatchUpValues({ matchUp: round.finalMatchUp })
      : matchUps
          .map(matchUp => getStackedMatchUpValues({ matchUp, feedBottom }))
          .flat();

    const frames = isFinal
      ? stackedMatchUpValues
      : getFrames(stackedMatchUpValues);

    return {
      round,
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

function getFinalMatchUpValues({ matchUp }) {
  const { sides, winningSide } = matchUp || {};
  const scoreString = matchUp?.score?.scoreStringSide1;
  const side =
    winningSide && sides.find(({ sideNumber }) => sideNumber === winningSide);

  return [
    [
      {
        side,
        matchUp,
        readyToScore: matchUp.readyToScore,
      },
    ],
    [
      {
        scoreString,
        sourceMatchUp: matchUp,
      },
    ],
  ];
}

function getStackedMatchUpValues({ matchUp, feedBottom }) {
  const { sides, schedule } = matchUp || {};
  const sideDetails = [0, 1].map(index => {
    const indexSide = matchUp?.sides[index];
    const contextIndex =
      indexSide?.displaySideNumber !== indexSide?.sideNumber
        ? indexSide?.displaySideNumber - 1
        : index;
    const sideIndex = feedBottom ? 1 - contextIndex : contextIndex;

    const side = sides[sideIndex];
    const scoreString = side?.sourceMatchUp?.score?.scoreStringSide1;

    return [
      {
        side,
        matchUp,
        sideIndex,
        readyToScore: side?.sourceMatchUp?.readyToScore,
      },
      {
        sideIndex,
        scoreString,
        sourceMatchUp: side?.sourceMatchUp,
      },
    ];
  });
  return [sideDetails[0], schedule, sideDetails[1]].flat();
}
