import React from 'react';

import {
  mocksEngine,
  tournamentEngine,
  drawDefinitionConstants,
} from 'tods-competition-factory';

import { useStyles } from './styles';

import { ExampleDrawStructures } from './ExampleDrawStructures';

const {
  FEED_IN,
  DOUBLE_ELIMINATION,
  SINGLE_ELIMINATION,
} = drawDefinitionConstants;

export default function DrawsDemo() {
  const classes = useStyles();

  const initialDrawDetails = {
    drawType: SINGLE_ELIMINATION,
    structureIndex: 0,
  };
  const [drawDetails, setDrawDetails] = React.useState(initialDrawDetails);
  const [completionState, setCompletionState] = React.useState('complete');

  const { drawType, structureIndex } = drawDetails;

  const drawTypeChange = drawType =>
    drawType && setDrawDetails({ structureIndex: 0, drawType });
  const completionChange = (_, v) => v !== undefined && setCompletionState(v);

  const drawSize =
    drawType === DOUBLE_ELIMINATION ? 12 : drawType === FEED_IN ? 31 : 32;
  const drawProfiles = [
    {
      drawType,
      drawSize,
      participantsCount: 30,
      automated: completionState !== 'manual',
    },
  ];
  const {
    eventIds: [eventId],
  } = mocksEngine.generateTournamentRecord({
    drawProfiles,
    completeAllMatchUps: completionState === 'complete',
    randomWinningSide: false,
  });

  const { eventData } = tournamentEngine.getEventData({ eventId }) || {};

  const props = {
    eventData,
    drawDetails,
    setDrawDetails,
    completionState,
    completionChange,
    drawTypeChange,
  };
  return <ExampleDrawStructures {...props} />;
}
