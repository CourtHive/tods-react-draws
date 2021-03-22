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
    borderBottom: `2px solid #06143f`,
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
    border: `solid 1px #dadce0`,
    borderBottom: `2px solid #06143f`,
    minWidth: 100,
    textTransform: 'uppercase',
    fontSize: 12,
    lineHeight: 1.6,
    letterSpacing: 0.35,
  },
  cellContent: {
    border: `solid 1px #dadce0`,
    fontSize: 12,
    lineHeight: 1.6,
    letterSpacing: 0.35,
  },
  contentContainer: {
    minWidth: 'max-content',
  },
  centerContent: {
    justifyContent: 'center',
  },
  participantHeader: {
    borderBottom: `2px solid #06143f`,
    width: 200,
    fontWeight: 'bold',
  },
  participantContent: {
    width: 200,
  },
}));
