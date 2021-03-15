import React from 'react';
import { useStyles } from './eliminationStyles';

import { generateStandardElimination } from '../../generators/columnGenerators/generateStandardElimination';
import { generateRoundsDefinition } from '../../generators/generateRoundsDefinition';
import { ColumnComponents } from './ColumnComponents';
import { Grid } from '@material-ui/core';

export function EliminationStructure(props) {
  const classes = useStyles();

  const { eventData, onScoreClick, onParticipantClick } = props;

  const { drawsData } = eventData;
  let { drawId, structureId } = props;

  if (!drawId) drawId = drawsData?.length && drawsData[0].drawId;
  const drawData = drawsData?.find(drawData => drawData.drawId === drawId);

  if (!structureId)
    structureId =
      drawData?.structures?.length && drawData.structures[0].structureId;
  const structureData = structureId
    ? drawData?.structures?.find(
        structureData => structureData.structureId === structureId
      )
    : drawData?.structures && drawData.structures[0];

  const { roundMatchUps } = structureData || {};
  const { roundsDefinition } = generateRoundsDefinition({ roundMatchUps });
  const columns = generateStandardElimination({ height: 70, roundsDefinition });

  const handleScoreClick = ({ matchUp, e }) => {
    if (typeof onScoreClick === 'function') {
      onScoreClick({ matchUp, e });
    }
  };
  const handleParticipantClick = ({ matchUp, sideNumber, e }) => {
    if (typeof onParticipantClick === 'function') {
      onParticipantClick({ matchUp, sideNumber, e });
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

    // TODO: column width needs to be calculated based on # of detail columns
    const detailsCount = round?.details?.length || 1;
    const maxWidth =
      round?.columnType === 'details' ? detailsCount * 30 : undefined;

    return (
      <Grid
        container
        direction="column"
        key={columnIndex}
        className={className}
        style={{ maxWidth }}
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
