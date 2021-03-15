import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './eliminationStyles';
import cx from 'classnames';

export const Side = ({ round, sideDetails, displayOnly, onClick }) => {
  const classes = useStyles();
  const { side, matchUp, sourceMatchUp } = sideDetails || {};
  const { sourceDrawPositionRange } = matchUp || {};
  const { bye, drawPosition, participant, sideNumber } = side || {};
  const dpText = sourceDrawPositionRange || drawPosition || '';
  const readyToScore = side?.sourceMatchUp?.readyToScore;

  let sideText = bye ? 'BYE' : participant?.participantName || '';
  const seed = side?.seedValue;
  if (seed) sideText += ` (${seed})`;

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
        matchUp,
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
