import React from 'react';
import { useStyles } from '../../styles/gridStyles';

import { Grid } from '@material-ui/core';
import { Frames } from './Frames';

export function EliminationStructure(props) {
  const { columns, onScoreClick, onParticipantClick } = props;
  const classes = useStyles();

  const handleScoreClick = ({ matchUpDetails, e }) => {
    if (typeof onScoreClick === 'function') {
      onScoreClick({ matchUpDetails, e });
    }
  };
  const handleParticipantClick = ({ matchUpDetails, sideNumber, e }) => {
    if (typeof onParticipantClick === 'function') {
      onParticipantClick({ matchUpDetails, sideNumber, e });
    }
  };

  const EliminationColumns = ({ columns }) =>
    columns.map((column, columnIndex) => {
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
            <Frames
              column={column}
              handleParticipantClick={handleParticipantClick}
              handleScoreClick={handleScoreClick}
            />
          )}
        </Grid>
      );
    });

  return (
    <Grid container direction="row" className={classes.drawRoot}>
      <EliminationColumns columns={columns} />
    </Grid>
  );
}
