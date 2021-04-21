import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		alignItems: 'center',
	},
	border: {
		borderBottom: '2px solid lightgray',
		width: '100%',
	},
	content: {
		paddingTop: theme.spacing(0.5),
		paddingBottom: theme.spacing(0.5),
		paddingRight: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		fontWeight: 500,
		fontSize: 22,
		color: 'lightgray',
	},
}));

interface DividerWithTextProps {
	children: string;
}

const DividerWithText = ({ children }: DividerWithTextProps): JSX.Element => {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<div className={classes.border} />
			<span className={classes.content}>{children}</span>
			<div className={classes.border} />
		</div>
	);
};
export default DividerWithText;