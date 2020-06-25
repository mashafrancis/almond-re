import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& input:valid + fieldset': {
        borderColor: '#1967d2',
      },
      '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        borderColor: '#1967d2',
        padding: '4px !important', // override inline-style
        flexWrap: 'wrap',
      },
    },
    margin: {
      margin: theme.spacing(1),
    },
    bottom: {
      position: 'fixed',
      bottom: 0,
      right: 0,
    },
  })
);

export default useStyles;
