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

const HeaderCell = ({ component, row, colspan = 1 }) => {
  const classes = useStyles();
  const cellClassName = component.getHeader?.()?.cellClassName;
  const contentClassName = component.getHeader?.()?.contentClassName;

  const handleOnClick = e => {
    component.headerClick?.(e, row);
  };

  return (
    <TableCell
      colSpan={colspan}
      key={component.key}
      onClick={handleOnClick}
      className={cellClassName}
      classes={{ root: classes.root, head: classes.head }}
    >
      <Grid container className={contentClassName}>
        <Grid item>{component.getHeader?.(row)?.children || ''}</Grid>
      </Grid>
    </TableCell>
  );
};

const RowCell = ({ component, row }) => {
  const classes = useStyles();
  const cellClassName = component.getValue?.()?.cellClassName;
  const contentClassName = component.getValue?.()?.contentClassName;

  const handleOnClick = e => {
    component.onClick?.(e, row);
  };

  return (
    <TableCell
      key={component.key}
      onClick={handleOnClick}
      className={cellClassName}
      classes={{ root: classes.root, head: classes.head }}
    >
      <Grid container className={contentClassName}>
        <Grid item>{component.getValue?.(row)?.children || ''}</Grid>
      </Grid>
    </TableCell>
  );
};

export function GroupTable(props) {
  const classes = useStyles();
  const { columnComponents, rowData } = props;

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="groupTable">
        <TableHead>
          <TableRow>
            {columnComponents.map((component, index) => {
              return (
                index !== 1 && (
                  <HeaderCell
                    colspan={index ? 1 : 2}
                    key={`${component.key}${index}`}
                    index={index}
                    row={rowData.slice(0, 1)}
                    component={component}
                  />
                )
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row, index) => (
            <TableRow key={`${row.drawPosition}${index}`}>
              {columnComponents.map((component, index) => (
                <RowCell
                  key={`${index}${component.key}`}
                  row={row}
                  index={index}
                  component={component}
                ></RowCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
