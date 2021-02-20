import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  drawRoot: {
    width: '100%',
    flexWrap: 'nowrap',
  },
  connectorColumn: {
    minWidth: 15,
    maxWidth: 20,
  },
  detailsColumn: {
    flexWrap: 'nowrap',
  },
  initialColumn: {
    minWidth: 200,
    maxWidth: 250,
  },
  roundColumn: {
    minWidth: 100,
    maxWidth: 110,
  },
  participant: {
    paddingLeft: 3,
    paddingRight: 3,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#f5f5f5',
    },
  },
  score: {
    paddingLeft: 3,
  },
  roundName: {
    marginLeft: 3,
    marginRight: 4,
    height: '1.5em',
  },
  noBoderBottom: {
    paddingBottom: '2px',
  },
  thickBorderBottom: {
    borderBottom: '2px solid black',
  },
  verticalDivider: {
    width: 1,
    marginTop: '4em',
    borderRight: '1px solid black',
  },
  borderRight: {
    borderRight: '1px solid black',
  },
  borderBottom: {
    borderBottom: '1px solid black',
  },
  bracketTop: {
    borderBottom: '1px solid black',
  },
  bracketBottom: {
    borderBottom: '1px solid black',
  },
  bracketContent: {},
}));