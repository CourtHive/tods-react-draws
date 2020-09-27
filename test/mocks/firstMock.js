import { utilities } from 'tods-competition-factory';
const { generateRange } = utilities;

export function generateColumns({ height, roundsDefinition }) {
  let priorFeedOffset = 0;
  const topMargin = roundsDefinition.find(r => r.feedTop) && height / 2;

  const columns = roundsDefinition.map((round, index) => {
    const { matchUpsCount } = round;
    return generateColumn({ matchUpsCount, round, index });
  });

  console.log({ columns });
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

  function generateColumn({ matchUpsCount, round }) {
    const { columnMultiplier, feedTop, feedBottom, roundNumber } = round;
    const matchUpHeight = calcHeight({ height, columnMultiplier });
    const feedOffset =
      priorFeedOffset +
      matchUpHeight * ((feedTop && -0.5) || (feedBottom && 0.5) || 0);
    priorFeedOffset = feedOffset;
    const firstMatchUpHeight =
      calcFirstHeight({ height, columnMultiplier }) +
      (topMargin || 0) +
      feedOffset;
    const generateDrawPositions =
      roundNumber === 1 || round.columnType === 'details';

    return {
      round,
      matchUpHeight,
      firstMatchUpHeight,
      matchUps: generateRange(0, matchUpsCount).map((r, i) => {
        const roundPosition = i + 1;
        const drawPositions = generateDrawPositions
          ? [i * 2 + 1, i * 2 + 2]
          : [];

        return {
          roundNumber,
          roundPosition,
          score: '6-1 6-3',
          matchUpId: `m-${roundNumber}-${roundPosition}`,
          drawPositions,
          sides: [{ sideNumber: 1 }, { sideNumber: 2 }],
        };
      }),
    };
  }
}

export const roundsDefinition = [
  {
    matchUpsCount: 16,
    columnMultiplier: 1,
    columnType: 'details',
    details: ['drawPosition'],
  },
  { columnType: 'divider' },
  {
    roundNumber: 1,
    matchUpsCount: 16,
    columnMultiplier: 1,
    columnType: 'classic',
    roundName: 'Round 1',
  },
  {
    roundNumber: 2,
    matchUpsCount: 8,
    columnMultiplier: 2,
    columnType: 'classic',
    roundName: 'Round 2',
  },
  {
    roundNumber: 2,
    matchUpsCount: 8,
    columnMultiplier: 2,
    columnType: 'connectors',
    roundName: 'Round 2',
  },
  {
    roundNumber: 3,
    matchUpsCount: 8,
    columnMultiplier: 2,
    columnType: 'classic',
    feedTop: true,
    roundName: 'Round 3',
  },
  {
    roundNumber: 4,
    matchUpsCount: 4,
    columnMultiplier: 3,
    columnType: 'classic',
    roundName: 'Round 4',
  },
  {
    roundNumber: 5,
    matchUpsCount: 4,
    columnMultiplier: 3,
    columnType: 'classic',
    feedBottom: true,
    roundName: 'Round 5',
  },
  {
    roundNumber: 6,
    matchUpsCount: 2,
    columnMultiplier: 4,
    columnType: 'classic',
    roundName: 'Round 6',
  },
  {
    roundNumber: 7,
    matchUpsCount: 1,
    columnMultiplier: 5,
    columnType: 'classic',
    roundName: 'Round 7',
  },
  {
    roundNumber: 8,
    matchUpsCount: 0,
    columnMultiplier: 6,
    columnType: 'classic',
    roundName: 'Final',
  },
];
