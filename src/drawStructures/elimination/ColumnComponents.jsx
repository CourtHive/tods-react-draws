import React from 'react';
import { useStyles } from './eliminationStyles';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Grid } from '@material-ui/core';
import { Side } from './Side';

export const ColumnComponents = ({
  column,
  nameFilter,
  displayOnly,
  eventHandlers,
}) => {
  const classes = useStyles();
  const { frames, round, matchUpHeight, firstMatchUpHeight } = column;

  const handleParticipantClick = ({ e, feedBottom, matchUp, sideIndex }) => {
    if (typeof eventHandlers?.onParticipantClick === 'function') {
      const side = matchUp?.sides && matchUp?.sides[sideIndex];
      const { participant, drawPosition } = side || {};
      eventHandlers.onParticipantClick({
        e,
        feedBottom,
        matchUp,
        participant,
        drawPosition,
        sideIndex,
      });
    }
  };

  const RoundName = ({ round, onRoundNameClick, onScheduleClick }) => {
    const notConnectors = round.columnType !== 'connectors';
    const roundName = notConnectors && round.roundName;
    const roundNumber = notConnectors && round.roundNumber;
    const bottom =
      (roundName && classes.thickBorderBottom) || classes.noBoderBottom;
    const handleRoundNameClick = e => {
      e.stopPropagation();
      if (typeof onRoundNameClick === 'function')
        onRoundNameClick({ e, roundNumber });
    };
    const handleOnScheduleClick = e => {
      if (typeof onScheduleClick === 'function')
        onScheduleClick({ e, roundNumber });
    };
    const roundNameProps = {
      width: '100%',
      wrap: 'nowrap',
      direction: 'row',
      justify: 'space-between',
      onClick: handleOnScheduleClick,
      className: `${classes.roundName} ${bottom}`,
    };
    return (
      <Grid container {...roundNameProps}>
        <Grid item onClick={handleRoundNameClick}>
          {roundName || ' '}
        </Grid>
        <Grid item>
          {roundNumber && onScheduleClick && (
            <AccessTimeIcon className={classes.roundScheduleIcon} />
          )}
        </Grid>
      </Grid>
    );
  };

  const Score = ({ round, scoreDetails, displayOnly, onClick }) => {
    const { scoreString, sourceMatchUp, sideIndex, feedBottom } =
      scoreDetails || {};
    const displayText = round?.columnType === 'classic';
    const scoreProps = {
      onClick: e => {
        !displayOnly &&
          onClick({ matchUp: sourceMatchUp, e, feedBottom, sideIndex });
      },
      className: classes.score,
    };

    return <div {...scoreProps}>{displayText && scoreString}</div>;
  };

  const Frame = ({ frame, index }) => {
    const isFinal = round.finalMatchUp;
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
      className:
        (isEven && !isDetails && !isFinal && classes.borderRight) || undefined,
    };

    const className = isDetails
      ? classes.positionDetails
      : columnEnd
      ? ''
      : isEven
      ? classes.bracketBottom
      : classes.bracketTop;

    return (
      <Grid key={index} item className={className}>
        <Grid container {...contentProps}>
          <Score
            round={round}
            onClick={eventHandlers?.onScoreClick}
            scoreDetails={scoreDetails}
            displayOnly={displayOnly}
          />
          {columnEnd ? null : (
            <Side
              round={round}
              nameFilter={nameFilter}
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
    <div style={{ marginLeft: '4px' }}>
      <RoundName
        onScheduleClick={eventHandlers?.onScheduleClick}
        onRoundNameClick={eventHandlers?.onRoundNameClick}
        round={round}
      />
      <Frames frames={frames} />
    </div>
  );
};
