import withStyles from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import InputBase from '@material-ui/core/InputBase';

export const BaseInput = withStyles(theme =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 2,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: `${theme.spacing(1)}px 26px ${theme.spacing(1)}px 12px`,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
      },
    },
  })
)(InputBase);
