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
}));
