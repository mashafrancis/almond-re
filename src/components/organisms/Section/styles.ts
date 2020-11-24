import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 1100,
		width: '100%',
		margin: '0 auto',
		padding: theme.spacing(6, 2),
		[theme.breakpoints.up('sm')]: {
			padding: theme.spacing(12, 2),
		},
	},
	fullWidth: {
		maxWidth: '100%',
	},
	disablePadding: {
		padding: 0,
	},
	narrow: {
		maxWidth: 800,
	},
	alternate: {},
}));

export default useStyles;
