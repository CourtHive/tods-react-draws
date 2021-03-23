import React from 'react';
import { useStyles } from './eliminationStyles';

import { generateStandardElimination } from '../../generators/columnGenerators/generateStandardElimination';
import { generateRoundsDefinition } from '../../generators/generateRoundsDefinition';
import { ColumnComponents } from './ColumnComponents';
import { Grid } from '@material-ui/core';

export function EliminationStructure(props) {
  const classes = useStyles();

  const { eventData, eventHandlers } = props;

  const { drawsData } = eventData;
  let { drawId, structureId } = props;

  const drawData = drawsData?.find(drawData => drawData.drawId === drawId);

  const structureData = structureId
    ? drawData?.structures?.find(
        structureData => structureData.structureId === structureId
      )
    : drawData?.structures && drawData.structures[0];

  const { roundMatchUps } = structureData || {};
  const { roundsDefinition } = generateRoundsDefinition({ roundMatchUps });
  const columns = generateStandardElimination({ height: 70, roundsDefinition });

  const handleScoreClick = ({ e, feedBottom, matchUp, sideIndex }) => {
    if (typeof eventHandlers?.onScoreClick === 'function') {
      eventHandlers.onScoreClick({ e, feedBottom, matchUp, sideIndex });
    }
  };
  const handleParticipantClick = ({ e, feedBottom, matchUp, sideIndex }) => {
    if (typeof eventHandlers?.onParticipantClick === 'function') {
      const participant =
        matchUp?.sides && matchUp?.sides[sideIndex]?.participant;
      eventHandlers.onParticipantClick({
        e,
        feedBottom,
        matchUp,
        participant,
        sideIndex,
      });
    }
  };

  const EliminationColumn = ({ column, columnIndex }) => {
    const { round } = column;

    const firstRound = round.roundNumber === 1;
    const classNames = {
      details: 'detailsColumn',
      divider: 'verticalDivider',
      connectors: 'connectorColumn',
      classic: firstRound ? 'initialColumn' : 'roundColumn',
    };
    const divider = round.columnType === 'divider';
    const columnClass = classNames[round.columnType];
    const className = classes[columnClass];

    const width = round?.columnType === 'details' ? 'auto' : undefined;

    return (
      <Grid
        container
        direction="column"
        key={columnIndex}
        className={className}
        style={{ width }}
      >
        {!divider && (
          <ColumnComponents
            column={column}
            handleParticipantClick={handleParticipantClick}
            handleScoreClick={handleScoreClick}
          />
        )}
      </Grid>
    );
  };

  return (
    <Grid container direction="row" className={classes.drawRoot}>
      {columns.map((column, columnIndex) => (
        <EliminationColumn
          column={column}
          columnIndex={columnIndex}
          key={columnIndex}
        />
      ))}
    </Grid>
  );
}
