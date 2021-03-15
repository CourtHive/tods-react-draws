import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
}));
