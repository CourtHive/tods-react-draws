import React from 'react';
import { useStyles } from '../../styles/gridStyles';
import { Grid } from '@material-ui/core';
import { Side } from './Side';

export const ColumnComponents = ({
  column,
  displayOnly,
  handleParticipantClick,
  handleScoreClick,
}) => {
  const classes = useStyles();
  const { frames, round, matchUpHeight, firstMatchUpHeight } = column;

  const RoundName = ({ round }) => {
    const notConnectors = round.columnType !== 'connectors';
    const roundName = notConnectors && round.roundName;
    const bottom =
      (roundName && classes.thickBorderBottom) || classes.noBoderBottom;
    const className = `${classes.roundName} ${bottom}`;
    return <div className={className}>{roundName || ' '}</div>;
  };

  const Score = ({ round, scoreDetails, displayOnly, onClick }) => {
    const { scoreString, sourceMatchUpDetails } = scoreDetails || {};
    const displayText = round?.columnType === 'classic';
    const scoreProps = {
      onClick: e => {
        !displayOnly && onClick({ matchUpDetails: sourceMatchUpDetails, e });
      },
      className: classes.score,
    };

    return <div {...scoreProps}>{displayText && scoreString}</div>;
  };

  const Frame = ({ frame, index }) => {
    const isDetails = round?.columnType === 'details';
    const scoreDetails = (index && frame[0]) || [];
    const sideDetails = frame[frame.length - 1];

    const columnEnd = index && frame.length === 1;
    const isEven = index % 2;
    const height = columnEnd
      ? undefined
      : index
      ? matchUpHeight
      : firstMatchUpHeight;

    const contentProps = {
      style: { height },
      direction: 'column',
      justify: 'space-between',
      className: (isEven && !isDetails && classes.borderRight) || undefined,
    };

    const className = columnEnd
      ? ''
      : isEven
      ? classes.bracketBottom
      : classes.bracketTop;

    return (
      <Grid key={index} item className={className}>
        <Grid container {...contentProps}>
          <Score
            round={round}
            onClick={handleScoreClick}
            scoreDetails={scoreDetails}
            displayOnly={displayOnly}
          />
          {columnEnd ? null : (
            <Side
              round={round}
              sideDetails={sideDetails}
              displayOnly={displayOnly}
              onClick={handleParticipantClick}
            />
          )}
        </Grid>
      </Grid>
    );
  };

  const Frames = ({ frames }) => (
    <>
      {frames.map((frame, index) => (
        <Frame frame={frame} key={index} index={index} />
      ))}
    </>
  );

  return (
    <>
      <RoundName round={round} />
      <Frames frames={frames} />
    </>
  );
};
