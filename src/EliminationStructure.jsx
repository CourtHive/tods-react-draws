import React from 'react';

import cx from 'classnames';
import { useStyles } from './styles/gridStyles';

import { Grid } from '@material-ui/core';

import { utilities } from 'tods-competition-factory';
const { numericSort } = utilities;

export function EliminationStructure(props) {
  const { columns, roundMatchUps, onScoreClick, onParticipantClick } = props;
  const classes = useStyles();

  const getScoreString = ({ matchUp }) => {
    if (typeof matchUp?.score === 'string') {
      return matchUp.score;
    } else if (typeof matchUp?.score === 'object') {
      if (matchUp.winningSide === 2) {
        return matchUp.score.scoreStringSide2 || '';
      } else {
        return matchUp.score.scoreStringSide1 || '';
      }
    }
  };

  const getScoringMatchUp = ({ sideNumber, roundNumber, roundPosition }) => {
    const targetRoundNumber = roundNumber - 1;
    const currentRoundMatchUpsCount = roundMatchUps[roundNumber]?.length;
    const targetRoundMatchUpsCount = roundMatchUps[targetRoundNumber]?.length;
    const countFactor =
      targetRoundMatchUpsCount / (currentRoundMatchUpsCount || 1);

    const sideIndex = 2 - sideNumber;
    const currentRoundPosition = roundPosition - sideIndex;

    const targetRoundPosition =
      currentRoundPosition * countFactor - (1 - sideIndex);

    const scoringMatchUp = roundMatchUps[targetRoundNumber]?.find(
      matchUp => matchUp.roundPosition === targetRoundPosition
    );

    return { scoringMatchUp, sideIndex };
  };
  const handleScoreClick = ({ scoringMatchUp, e }) => {
    if (typeof onScoreClick === 'function') {
      onScoreClick({ matchUp: scoringMatchUp, e });
    }
  };
  const handleParticipantClick = ({ matchUp, sideNumber, e }) => {
    if (typeof onParticipantClick === 'function') {
      onParticipantClick({ matchUp, sideNumber, e });
    }
  };

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

    const { roundNumber, roundPosition } = matchUp;
    const { scoringMatchUp, sideIndex } = getScoringMatchUp({
      sideNumber,
      roundNumber,
      roundPosition,
    });
    const isFedScorePosition =
      (round.feedTop && sideNumber === 2) ||
      (round.feedBottom && sideNumber === 1);
    const scoreString =
      !isFinal &&
      !isFedScorePosition &&
      getScoreString({ matchUp: scoringMatchUp });
    const displayText = round.columnType === 'classic';
    const displayDetails = round.columnType === 'details';

    const PreviousMatchUpScore = () => {
      const scoreProps = {
        onClick: e => {
          console.log('e', e);
          handleScoreClick({ scoringMatchUp, sideIndex, e });
        },
        className: classes.score,
      };

      return <div {...scoreProps}>{displayText && scoreString}</div>;
    };

    const Participant = () => {
      const drawPositions = (matchUp?.drawPositions || []).sort(numericSort);
      const drawPosition = drawPositions[sideNumber - 1] || '';
      const dpText = (drawPosition && `${drawPosition}`) || '';

      const displaySideNumber = matchUp?.winningSide || sideNumber;
      const side = matchUp?.sides?.find(
        side => side.sideNumber === displaySideNumber
      );
      const seed = side?.seedValue;
      let participantName = side?.participant?.participantName || '';
      if (seed) participantName += ` (${seed})`;

      //const teamString = matchUp?.roundNumber === 1 && 'Team';
      const teamString = '';

      const readOnly = false;
      const readyToScore = matchUp?.readyToScore;

      const participantStyle = !readOnly
        ? {
            className: cx(classes.participant, {
              [classes.seededPrticipant]: seed,
              [classes.readyToScore]: readyToScore,
              [classes.hoveredPrticipant]: !readOnly,
            }),
            width: '100%',
          }
        : {
            className: cx(classes.participant, {
              [classes.seededPrticipant]: seed,
            }),
          };

      const participantProps = {
        onClick: e => {
          handleParticipantClick({
            matchUp,
            sideNumber,
            e,
          });
        },
        className: classes.participant,
        width: '100%',
        direction: 'row',
        justify: 'space-between',
      };

      return (
        <Grid container {...participantStyle} {...participantProps}>
          <Grid item>{displayText && participantName}</Grid>
          <Grid item>
            {(displayText && teamString) || (displayDetails && dpText)}
          </Grid>
        </Grid>
      );
    };

    const TeamParticipant = () => {
      return (
        <Grid container direction="column">
          <Participant />
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
        const roundNumber = matchUpsCount
          ? matchUp.roundNumber
          : matchUp.roundNumber + 1;
        const sideNumber = matchUpsCount ? 1 : 2;
        const roundPosition = matchUp.roundPosition + 1;
        const { scoringMatchUp, sideIndex } = getScoringMatchUp({
          sideNumber,
          roundNumber,
          roundPosition,
        });
        const scoreProps = {
          onClick: event => {
            console.log('boo', event);
            handleScoreClick({
              scoringMatchUp,
              sideIndex,
              event,
            });
          },
          className: classes.score,
        };

        const scoreString = getScoreString({ matchUp: scoringMatchUp });
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
