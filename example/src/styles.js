import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  tabPanel: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  nameFilter: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 2,
    height: '2.3em',
    '& div': {
      height: '2.3em',
    },
    '& > div': {
      padding: '0 10px!important',
    },
    '& input': {
      height: '12px!important',
      width: '100%!important',
    },
    '&:focus': {
      borderRadius: 2,
      backgroundColor: theme.palette.background.paper,
    },
  },
}));
