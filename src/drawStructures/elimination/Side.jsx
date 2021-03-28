import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './eliminationStyles';
import cx from 'classnames';

export const Side = ({ round, sideDetails, displayOnly, onClick }) => {
  const classes = useStyles();
  const isFinal = round.finalMatchUp;
  const displayText = round?.columnType === 'classic';
  const displayDetails = round?.columnType === 'details';

  const { side, matchUp, sideIndex, feedBottom } = sideDetails || {};
  const { bye, drawPosition, participant, sourceDrawPositionRange } =
    side || {};
  const { feedRound, roundNumber } = matchUp || {};

  const dpText = sourceDrawPositionRange || drawPosition || '';
  const readyToScore = isFinal
    ? matchUp?.readyToScore
    : side?.sourceMatchUp?.readyToScore;

  let sideText = bye ? 'BYE' : participant?.participantName || '';
  const seed = side?.seedValue;
  if (seed) sideText += ` (${seed})`;
  if (feedRound && sourceDrawPositionRange)
    sideText = `${sourceDrawPositionRange} ${sideText}`;

  const unfilledPosition = roundNumber === 1 && !sideText && displayText;

  const participantStyle = !displayOnly
    ? {
        className: cx(classes.participant, {
          [classes.seededPrticipant]: seed,
          [classes.readyToScore]:
            (readyToScore && !displayOnly) || unfilledPosition,
          [classes.hoveredPrticipant]: !displayOnly,
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
      onClick({
        feedBottom,
        sideIndex,
        matchUp,
        e,
      });
    },
    width: '100%',
    direction: 'row',
    justify: 'space-between',
  };

  return (
    <Grid container>
      <Grid container {...participantStyle} {...participantProps}>
        <Grid item>
          {(displayText && sideText) || (displayDetails && dpText)}
        </Grid>
      </Grid>
    </Grid>
  );
};
