import React from 'react';
import ReactDOM from 'react-dom';

import {
  mocksEngine,
  tournamentEngine,
  drawDefinitionConstants,
} from 'tods-competition-factory';

import { useStyles } from './styles';
import { ExampleDrawStructures } from './ExampleDrawStructures';

// import tournamentRecord from './tournamentRecord/tods.json';

const {
  FEED_IN,
  DOUBLE_ELIMINATION,
  SINGLE_ELIMINATION,
} = drawDefinitionConstants;

const App = () => {
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

  let eventId;
  let tournamentRecord;
  if (tournamentRecord?.events?.length) {
    eventId = tournamentRecord.events[0].eventId;
    tournamentEngine.setState(tournamentRecord);
  } else {
    ({
      eventIds: [eventId],
      tournamentRecord,
    } = mocksEngine.generateTournamentRecord({
      drawProfiles,
      completeAllMatchUps: completionState === 'complete',
      randomWinningSide: false,
    }));
  }

  tournamentEngine.setState(tournamentRecord);
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
};

ReactDOM.render(<App />, document.getElementById('root'));
