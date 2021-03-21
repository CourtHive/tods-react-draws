import React from 'react';
import { useStyles } from './roundRobinStyles';
import { GroupTable } from './GroupTable';

import { getColumnComponents } from './getColumnComponents';

export function RoundRobinGroup(props) {
  const classes = useStyles();

  const {
    contextData,
    dictionary,
    rowData,
    onScoreClick,
    onParticipantClick,
  } = props;

  console.log({ rowData });

  const { columnComponents } = getColumnComponents({
    rowData,
    dictionary,
    contextData,
    onScoreClick,
    onParticipantClick,
  });

  return (
    <div className={classes.tableContainer}>
      <GroupTable
        columnData={[]}
        rowData={rowData}
        columnComponents={columnComponents}
        data={rowData}
      />
    </div>
  );
}
