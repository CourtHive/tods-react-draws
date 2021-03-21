import React from 'react';
import { useStyles } from './roundRobinStyles';
import { GroupTable } from './GroupTable';

import { getColumnComponents } from './getColumnComponents';

export function RoundRobinGroup(props) {
  const classes = useStyles();

  const { rowData, onScoreClick, onParticipantClick } = props;

  const { columnComponents } = getColumnComponents({ rowData });

  return (
    <div className={classes.tableContainer}>
      <GroupTable
        columnData={[]}
        rowData={rowData}
        columnComponents={columnComponents}
        onScoreClick={onScoreClick}
        onParticipantClick={onParticipantClick}
        data={rowData}
      />
    </div>
  );
}
