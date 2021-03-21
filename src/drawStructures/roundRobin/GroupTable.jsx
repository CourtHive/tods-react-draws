import React from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import { useStyles } from './roundRobinStyles';

const HeaderCell = ({ component, row }) => {
  const classes = useStyles();
  const cellClassName = component.getHeader?.()?.cellClassName;
  const headerClassName = component.getHeader?.()?.headerClassName;

  return (
    <TableCell
      className={cellClassName}
      key={component.key}
      onClick={component.headerClick?.(row)}
      classes={{ root: classes.root, head: classes.head }}
    >
      <Grid container className={headerClassName}>
        <Grid item>{component.getHeader?.()?.children || ''}</Grid>
      </Grid>
    </TableCell>
  );
};

const RowCell = ({ component, row }) => {
  const classes = useStyles();
  const cellClassName = component.getValue?.()?.cellClassName;
  const headerClassName = component.getValue?.()?.headerClassName;

  return (
    <TableCell
      className={cellClassName}
      key={component.key}
      onClick={component.onClick?.(row)}
      classes={{ root: classes.root, head: classes.head }}
    >
      <Grid container className={headerClassName}>
        <Grid item>{component.getValue?.(row)?.children || ''}</Grid>
      </Grid>
    </TableCell>
  );
};

export function GroupTable(props) {
  const classes = useStyles();
  const { columnComponents, rowData, onScoreClick, onParticipantClick } = props;
  console.log({ rowData });
  const bodyRows = rowData.slice(1);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="groupTable">
        <TableHead>
          <TableRow>
            {columnComponents.map((component, index) => (
              <HeaderCell
                key={`${component.key}${index}`}
                row={rowData.slice(0, 1)}
                component={component}
                onParticipantClick={onParticipantClick}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row, index) => (
            <TableRow key={`${row.drawPosition}${index}`}>
              {columnComponents.map((component, index) => (
                <RowCell
                  key={`${index}${component.key}`}
                  row={row}
                  component={component}
                  onScoreClick={onScoreClick}
                  onParticipantClick={onParticipantClick}
                ></RowCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
