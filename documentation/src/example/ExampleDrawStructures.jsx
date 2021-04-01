import React from 'react';

import { DrawStructure } from 'tods-react-draws';
import { DrawType } from './components/SelectDrawType';
import { Completion } from './components/toggleComplete';
import { SelectStructure } from './components/selectStructure';

import { Box, Grid, TextField } from '@material-ui/core';

import { useStyles } from './styles';

export const ExampleDrawStructures = ({
  eventData,
  drawDetails,
  setDrawDetails,
  drawTypeChange,
  completionState,
  completionChange,
}) => {
  const classes = useStyles();

  const [nameFilter, setNameFilter] = React.useState();
  const { drawType, structureIndex } = drawDetails;

  const filterChange = e => setNameFilter(e.target.value);
  const structureChange = newName => {
    if (newName) {
      const newIndex = structureNames.indexOf(newName);
      setDrawDetails({ structureIndex: newIndex, drawType });
    }
  };

  const eventHandlers = {
    onScheduleClick: props => console.log('Schedule', props),
    onRoundNameClick: props => console.log('Round Name', props),
    onScoreClick: props => console.log('Scoring', props),
    onParticipantClick: props => console.log('Participant', props),
    onHeaderClick: props => console.log('header', props),
    onStatsClick: props => console.log('stats', props),
  };

  const structures = eventData.drawsData[0].structures;
  const structureNames = structures.map(({ structureName }) => structureName);
  const structureName = structureNames[structureIndex];
  const structureId =
    structureIndex &&
    structures.length > structureIndex &&
    structures[structureIndex].structureId;

  const args = {
    dictionary: {},
    eventData,
    structureId,
    eventHandlers,
    nameFilter,
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
            <TextField
              name="nameFilter"
              onChange={filterChange}
              label={'Participant Filter'}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              className={classes.nameFilter}
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
