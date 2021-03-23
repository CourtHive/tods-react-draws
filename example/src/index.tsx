import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { DrawType } from './components/SelectDrawType';
import { Completion } from './components/toggleComplete';

import {
  mocksEngine,
  tournamentEngine,
  drawDefinitionConstants,
} from 'tods-competition-factory';
import { DrawStructure } from '../../dist';

import { Box, Grid } from '@material-ui/core';
import { SelectStructure } from './components/selectStructure';
import { useStyles } from './styles';

const {
  FEED_IN,
  DOUBLE_ELIMINATION,
  ROUND_ROBIN,
  // SINGLE_ELIMINATION,
} = drawDefinitionConstants;

const App = () => {
  const classes = useStyles();

  const initialDrawDetails = {
    drawType: ROUND_ROBIN,
    // drawType: SINGLE_ELIMINATION,
    structureIndex: 0,
  };
  const [drawDetails, setDrawDetails] = React.useState(initialDrawDetails);
  const [completionState, setCompletionState] = React.useState(true);

  const { drawType, structureIndex } = drawDetails;

  const drawTypeChange = drawType =>
    drawType && setDrawDetails({ structureIndex: 0, drawType });
  const structureChange = newName => {
    if (newName) {
      const newIndex = structureNames.indexOf(newName);
      setDrawDetails({ structureIndex: newIndex, drawType });
    }
  };
  const completionChange = (_, v) => v !== undefined && setCompletionState(v);

  const drawSize =
    drawType === DOUBLE_ELIMINATION ? 12 : drawType === FEED_IN ? 31 : 32;
  const drawProfiles = [
    {
      drawType,
      drawSize,
      participantsCount: 30,
    },
  ];
  const {
    eventIds: [eventId],
  } = mocksEngine.generateTournamentRecord({
    drawProfiles,
    completeAllMatchUps: completionState,
    randomWinningSide: false,
  });

  const { eventData } = tournamentEngine.getEventData({ eventId }) || {};

  const eventHandlers = {
    onScoreClick: ({ e, matchUp, sideIndex }) => {
      console.log('Scoring', { e, matchUp, sideIndex });
    },
    onParticipantClick: ({ e, participant, matchUp, sideIndex }) => {
      console.log('Participant', { e, participant, matchUp, sideIndex });
    },
    onStructureClick: ({ e, structureId, structureName }) => {
      console.log({ e, structureId, structureName });
    },
  };

  const structures = eventData.drawsData[0].structures;
  const structureNames = structures.map(({ structureName }) => structureName);
  const structureName = structureNames[structureIndex];
  const structureId =
    structureIndex &&
    structures.length > structureIndex &&
    structures[structureIndex].structureId;

  const args = {
    eventData,
    structureId,
    eventHandlers,
  };

  return (
    <div>
      <Box className={classes.tabPanel}>
        <Grid
          container
          direction="row"
          justify="space-between"
          className={classes.headerRoot}
        >
          <Grid item>
            <DrawType drawType={drawType} onChange={drawTypeChange} />
          </Grid>
          <Grid item>
            <SelectStructure
              structureName={structureName}
              structureNames={structureNames}
              onChange={structureChange}
            />
          </Grid>
          <Grid item>
            <Completion
              completion={completionState}
              onChange={completionChange}
            />
          </Grid>
        </Grid>
      </Box>
      <DrawStructure {...args} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
