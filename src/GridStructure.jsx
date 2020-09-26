import React from 'react';

import { Grid } from '@material-ui/core';

import { useStyles } from './styles/gridStyles';

import { utilities } from 'tods-competition-factory';
const { generateRange, numericSort } = utilities;

const height = 70;

export function GridStructure() {
  const classes = useStyles();

  const calcHeight = ({ height, columnMultiplier }) => {
    if (!columnMultiplier) return 0;
    return (
      height * Math.pow(2, columnMultiplier - 1) +
      Math.pow(2, columnMultiplier - 1) -
      1
    );
  };
  const calcFirstHeight = ({ height, columnMultiplier }) => {
    if (!columnMultiplier) return 0;
    const multiplier =
      columnMultiplier > 1 ? Math.pow(2, columnMultiplier - 2) - 1 : 0;
    const base = height + height * multiplier;
    const offset = columnMultiplier > 1 ? height * 0.5 : 0;
    const borders = multiplier || 1;
    return base + offset + borders;
  };

  const roundsDefinition = [
    {
      matchUps: 5,
      columnMultiplier: 1,
      columnType: 'details',
      details: ['drawPosition'],
    },
    { columnType: 'divider' },
    {
      matchUps: 5,
      roundNumber: 1,
      columnMultiplier: 1,
      columnType: 'classic',
      roundName: 'Round 1',
    },
    {
      matchUps: 4,
      roundNumber: 2,
      columnMultiplier: 2,
      columnType: 'classic',
      roundName: 'Round 2',
    },
    {
      matchUps: 4,
      roundNumber: 2,
      columnMultiplier: 2,
      columnType: 'connectors',
      roundName: 'Round 2',
    },
    {
      matchUps: 4,
      roundNumber: 3,
      columnMultiplier: 2,
      columnType: 'classic',
      feedTop: true,
      roundName: 'Round 3',
    },
    {
      matchUps: 3,
      roundNumber: 4,
      columnMultiplier: 3,
      columnType: 'classic',
      roundName: 'Round 4',
    },
    {
      matchUps: 3,
      roundNumber: 5,
      columnMultiplier: 3,
      columnType: 'classic',
      feedBottom: true,
      roundName: 'Round 5',
    },
    {
      matchUps: 2,
      roundNumber: 6,
      columnMultiplier: 4,
      columnType: 'classic',
      roundName: 'Round 6',
    },
    {
      matchUps: 1,
      roundNumber: 7,
      columnMultiplier: 5,
      columnType: 'classic',
      roundName: 'Round 7',
    },
    {
      matchUps: 0,
      roundNumber: 8,
      columnMultiplier: 6,
      columnType: 'classic',
      roundName: 'Final',
    },
  ];

  const topMargin = roundsDefinition.find(r => r.feedTop) && height / 2;

  let priorFeedOffset = 0;
  const generateColumn = ({ matchUpsCount, round }) => {
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
  };

  const columns = roundsDefinition.map((round, index) => {
    const { matchUps } = round;
    const matchUpsCount = Math.pow(2, matchUps - 1) || 0;
    return generateColumn({ matchUpsCount, round, index });
  });

  const handleScoreClick = ({ matchUp }) => console.log({ matchUp });
  const handleParticipantClick = ({ matchUp }) => console.log({ matchUp });

  const MatchUpSide = props => {
    const { sideNumber, matchUp, height, round } = props;
    const isEven = (sideNumber - 1) % 2;
    const isDetails = round?.columnType === 'details';

    const contentProps = {
      style: { height },
      direction: 'column',
      justify: 'space-between',
      className: (isEven && !isDetails && classes.borderRight) || undefined,
    };

    const isFedScorePosition =
      (round.feedTop && sideNumber === 2) ||
      (round.feedBottom && sideNumber === 1);
    const scoreString =
      matchUp?.roundNumber > 1 &&
      !(matchUp?.roundPosition === 1 && sideNumber === 1) &&
      !isFedScorePosition &&
      matchUp?.score;
    const displayText = round.columnType === 'classic';
    const displayDetails = round.columnType === 'details';

    const PreviousMatchUpScore = () => {
      const scoreProps = {
        onClick: () => handleScoreClick({ matchUp }),
        className: classes.score,
      };

      return <div {...scoreProps}>{displayText && scoreString}</div>;
    };

    const Participant = props => {
      const { index } = props || {};
      const drawPositions = (matchUp?.drawPositions || []).sort(numericSort);
      const drawPosition = drawPositions[sideNumber - 1] || '';
      const dpText = (drawPosition && `${drawPosition}`) || '';
      const sideText = `Side ${sideNumber} ${index || ''}`;
      const teamString = matchUp?.roundNumber === 1 && 'Team';

      const participantProps = {
        onClick: () => handleParticipantClick({ matchUp }),
        className: classes.participant,
        width: '100%',
        direction: 'row',
        justify: 'space-between',
      };

      return (
        <Grid container {...participantProps}>
          <Grid item>{displayText && sideText}</Grid>
          <Grid item>
            {(displayText && teamString) || (displayDetails && dpText)}
          </Grid>
        </Grid>
      );
    };

    const TeamParticipant = () => {
      return (
        <Grid container direction="column">
          <Participant index={2} />
          <Participant index={1} />
        </Grid>
      );
    };

    const className = isEven ? classes.bracketBottom : classes.bracketTop;

    return (
      <Grid item className={className}>
        <Grid container {...contentProps}>
          <PreviousMatchUpScore />
          <TeamParticipant />
        </Grid>
      </Grid>
    );
  };

  const MatchUp = props => {
    const { matchUp, matchUpHeight, firstMatchUpHeight, round } = props;
    const { roundPosition, sides } = matchUp;

    const contentHeight =
      roundPosition === 1 ? firstMatchUpHeight : matchUpHeight;
    const heights = [contentHeight, matchUpHeight];

    return (
      <>
        {sides.map((side, index) => {
          const sideProps = {
            ...side,
            matchUp,
            round,
            height: heights[index],
          };
          return <MatchUpSide key={index} {...sideProps} />;
        })}
      </>
    );
  };

  const GridColumns = ({ columns }) =>
    columns.map((column, columnIndex) => {
      const { matchUps, round, matchUpHeight, firstMatchUpHeight } = column;
      const matchUpsCount = matchUps.length;
      const displayText = round.columnType === 'classic';

      const Final = () => {
        if (matchUpsCount) return null;
        const matchUp = columnIndex && columns[columnIndex - 1].matchUps[0];
        const { sides, winningSide } = matchUp || {};
        const side = sides && sides[(winningSide && winningSide - 1) || 0]; // should be matchUp.winningSide

        const sideProps = {
          ...side,
          matchUp,
          round,
          height: firstMatchUpHeight,
        };

        return <MatchUpSide {...sideProps} />;
      };

      const RoundName = () => {
        const notConnectors = round.columnType !== 'connectors';
        const roundName = notConnectors && round.roundName;
        const bottom =
          (roundName && classes.thickBorderBottom) || classes.noBoderBottom;
        const className = `${classes.roundName} ${bottom}`;
        return <div className={className}>{roundName || ' '}</div>;
      };

      const ScoreArea = () => {
        const matchUp = matchUpsCount
          ? matchUps[matchUps.length - 1]
          : columnIndex && columns[columnIndex - 1]?.matchUps[0];
        const scoreProps = {
          onClick: () => handleScoreClick({ matchUp }),
          className: classes.score,
        };

        const scoreString = matchUp?.score;
        if (!matchUp || matchUp.roundNumber === 1) return null;

        return (
          <>
            <div {...scoreProps}>{displayText && scoreString}</div>
          </>
        );
      };

      const MatchUps = () => {
        return (
          <>
            <RoundName />
            {matchUps.map((matchUp, key) => {
              const matchUpProps = {
                matchUp,
                round,
                matchUpHeight,
                firstMatchUpHeight,
              };

              return <MatchUp key={key} {...matchUpProps} />;
            })}
            <Final />
            <ScoreArea />
          </>
        );
      };

      const firstRound = round.roundNumber === 1;
      const classNames = {
        details: 'detailsColumn',
        divider: 'verticalDivider',
        connectors: 'connectorColumn',
        classic: firstRound ? 'initialColumn' : 'roundColumn',
      };
      const divider = round.columnType === 'divider';
      const columnClass = classNames[round.columnType];
      const className = classes[columnClass];

      // TODO: column width needs to be calculated based on # of detail columns
      const detailsCount = round?.details?.length || 1;
      const maxWidth =
        round?.columnType === 'details' ? detailsCount * 30 : undefined;

      return (
        <Grid
          container
          direction="column"
          key={columnIndex}
          className={className}
          style={{ maxWidth }}
        >
          {!divider && <MatchUps />}
        </Grid>
      );
    });

  return (
    <Grid container direction="row" className={classes.drawRoot}>
      <GridColumns columns={columns} />
    </Grid>
  );
}
