import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from '../../styles/gridStyles';
import cx from 'classnames';

export const Side = ({ round, sideDetails, displayOnly, onClick }) => {
  const classes = useStyles();
  const { side, matchUpDetails, readyToScore } = sideDetails || {};
  const { finishingRound, sourceDrawPositionRange } = matchUpDetails || {};
  const { bye, drawPosition, participant, sideNumber } = side || {};
  const dpText = sourceDrawPositionRange || drawPosition || '';

  let sideText = bye ? 'BYE' : participant?.participantName || '';
  const seed = side?.seedValue;
  if (seed) sideText += ` (${seed})`;

  if (round.finalMatchUp) console.log({ matchUpDetails });

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
