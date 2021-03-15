import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useStyles } from './roundRobinStyles';

export function GroupTable(props) {
  const classes = useStyles();
  const { columnData, rowData } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="groupTable">
        <TableHead>
          <TableRow>
            {columnData.map(column => (
              <TableCell></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              {columnData.map(column => (
                <TableCell></TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
