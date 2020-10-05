import React from 'react';

import { Grid } from '@material-ui/core';
import { useStyles } from './styles/gridStyles';

import { utilities } from 'tods-competition-factory';
const { numericSort } = utilities;

export function GridStructure(props) {
  const { columns, roundMatchUps } = props;
  const classes = useStyles();

  const handleScoreClick = value => {
    console.log(value);
  };
  const handleParticipantClick = ({ matchUp }) => console.log({ matchUp });

  const MatchUpSide = props => {
    const { sideNumber, matchUp, height, round, isFinal } = props;
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
      !isFinal &&
      matchUp?.roundNumber > 1 &&
      !(matchUp?.roundPosition === 1 && sideNumber === 1) &&
      !isFedScorePosition &&
      'Boo';
    const displayText = round.columnType === 'classic';
    const displayDetails = round.columnType === 'details';

    const PreviousMatchUpScore = () => {
      const { roundNumber, roundPosition } = matchUp;
      const scoreProps = {
        onClick: () =>
          handleScoreClick({ sideNumber, roundNumber, roundPosition }),
        className: classes.score,
      };

      return <div {...scoreProps}>{displayText && scoreString}</div>;
    };

    const Participant = () => {
      const drawPositions = (matchUp?.drawPositions || []).sort(numericSort);
      const drawPosition = drawPositions[sideNumber - 1] || '';
      const dpText = (drawPosition && `${drawPosition}`) || '';
      const sideText = `${sideNumber ? 'Side' : 'Winner'} ${sideNumber || ''}`;
      const teamString = matchUp?.roundNumber === 1 && 'Team';

      const participantProps = {
        onClick: () => handleParticipantClick({ matchUp, sideNumber }),
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
        {(sides || [{}, {}]).map((side, index) => {
          const sideProps = {
            ...side,
            matchUp,
            round,
            height: heights[index],
            sideNumber: index + 1,
          };
          return <MatchUpSide key={index} {...sideProps} />;
        })}
      </>
    );
  };

  function getScoreSourceMatchUp({ matchUp, round }) {
    const { roundNumber, roundPosition } = matchUp;
    const previousRoundNumber = roundNumber - 1;
    const matchUpsCount = roundMatchUps[roundNumber].length;
    const previouRoundMatchUpsCount =
      roundMatchUps[previousRoundNumber]?.length;
    const targetRoundPosition =
      matchUpsCount === previouRoundMatchUpsCount
        ? roundPosition
        : roundPosition / 2;
    return { roundNumber, roundPosition, round };
  }

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
          isFinal: true,
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
        const { sideNumber, roundNumber, roundPosition } = matchUp;
        const scoreProps = {
          onClick: () =>
            handleScoreClick({ sideNumber, roundNumber, roundPosition }),
          className: classes.score,
        };

        const scoreString = 'Foo';
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
