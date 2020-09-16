import {
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const useSnackStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
