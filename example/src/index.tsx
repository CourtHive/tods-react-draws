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
import { EliminationStructure, RoundRobinStructure } from '../../dist';

import { Box, Grid } from '@material-ui/core';
import { useStyles } from './styles';
import { SelectStructure } from './components/selectStructure';

const { SINGLE_ELIMINATION, ROUND_ROBIN, FEED_IN } = drawDefinitionConstants;

const App = () => {
  const classes = useStyles();

  const initialDrawDetails = {
    drawType: SINGLE_ELIMINATION,
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

  const drawSize = drawType === FEED_IN ? 31 : 32;
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
  });

  const { eventData } = tournamentEngine.getEventData({ eventId }) || {};
  const onScoreClick = ({ matchUp, e, sideIndex }) => {
    console.log('Scoring matchUp', { matchUp, e, sideIndex });
  };
  const onParticipantClick = ({ matchUp, sideIndex, e }) => {
    console.log('Participant matchUp', {
      sideIndex,
      matchUp,
      e,
    });
  };

  const structures = eventData.drawsData[0].structures;
  const structureNames = structures.map(({ structureName }) => structureName);
  const structureName = structureNames[structureIndex];
  const structureId =
    structureIndex &&
    structures.length > structureIndex &&
    structures[structureIndex].structureId;

  const isRoundRobin = drawType?.indexOf(ROUND_ROBIN) >= 0;
  const args = {
    eventData,
    structureId,
    onScoreClick,
    onParticipantClick,
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
      {isRoundRobin ? (
        <RoundRobinStructure {...args} />
      ) : (
        <EliminationStructure {...args} />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
