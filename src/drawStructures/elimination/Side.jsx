import React from 'react';
import { useStyles } from '../../styles/gridStyles';
import cx from 'classnames';

import { Grid } from '@material-ui/core';

export const Side = ({ round, sideDetails, displayOnly, onClick }) => {
  const classes = useStyles();
  const { side, matchUpDetails, readyToScore } = sideDetails || {};
  // const { roundNumber } = matchUpDetails || {};
  const { bye, drawPosition, participant, sideNumber } = side || {};
  const dpText = drawPosition || '';
  const seed = side?.seedValue;
  let sideText = bye ? 'BYE' : participant?.participantName || '';
  if (seed) sideText += ` (${seed})`;

  /*
  const isFinal = matchUp?.finishingRound === 1;
  const sideIndex =
    isFinal && matchUp?.winningSide
      ? matchUp?.winningSide - 1
      : round?.feedBottom
      ? 3 - displaySideNumber - 1
      : displaySideNumber - 1;

  const dpText =
    matchUp?.sides[sideIndex]?.sourceDrawPositionRange ||
    matchUp?.sides[sideIndex]?.drawPosition;
    */

  const participantStyle = !displayOnly
    ? {
        className: cx(classes.participant, {
          [classes.seededPrticipant]: seed,
          [classes.readyToScore]: readyToScore && !displayOnly,
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
        matchUpDetails,
        sideNumber,
        e,
      });
    },
    width: '100%',
    direction: 'row',
    justify: 'space-between',
  };
  const displayText = round?.columnType === 'classic';
  const displayDetails = round?.columnType === 'details';

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
