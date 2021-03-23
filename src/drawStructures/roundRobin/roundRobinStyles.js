import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
  root: {
    padding: '0 16px 0 16px',
    fontFamily: 'inherit',
  },
  body: {
    padding: '0 16px 0 16px',
  },
  head: {
    padding: '0 16px 0 16px',
  },
  groupName: {
    borderBottom: '2px solid #040E2C',
    fontWeight: 'bold',
    maxWidth: 30,
    fontSize: 12,
    lineHeight: 1.5,
    letterSpacing: 0.25,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
  drawPositions: {
    maxWidth: 30,
  },
  positions: {
    border: 'solid 1px #e1e3e6',
    borderBottom: '2px solid #040E2C',
    minWidth: 100,
    textTransform: 'uppercase',
    fontSize: 12,
    lineHeight: 1.5,
    letterSpacing: 0.35,
  },
  cellContent: {
    border: 'solid 1px #e1e3e6',
    fontSize: 12,
    lineHeight: 1.5,
    letterSpacing: 0.35,
  },
  loserContent: {
    border: 'solid 1px #e1e3e6',
    fontSize: 12,
    color: 'red',
    lineHeight: 1.5,
    letterSpacing: 0.35,
  },
  byeContent: {
    border: 'solid 1px #e1e3e6',
    background: '#FFFCE9 ',
  },
  reflexiveContent: {
    border: 'solid 1px #e1e3e6',
    background: '#e1e3e6',
  },
  contentContainer: {
    minWidth: 'max-content',
  },
  centerContent: {
    justifyContent: 'center',
  },
  valueHeader: {
    border: 'solid 1px #e1e3e6',
    borderBottom: '2px solid #040E2C',
    textTransform: 'uppercase',
    width: 30,
    fontSize: 12,
    lineHeight: 1.5,
  },
  centerValue: {
    justifyContent: 'center',
    width: 30,
  },
  participantHeader: {
    borderBottom: '2px solid #040E2C',
    width: 200,
    fontWeight: 'bold',
  },
  participantContent: {
    width: 200,
  },
  tableContainer: {
    margin: '20px 0 30px 0',
  },
}));
