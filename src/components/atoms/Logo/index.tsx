import { NavLink } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import { Image } from '@components/atoms';
import { makeStyles } from '@material-ui/core/styles';

const logo = 'https://static.almondhydroponics.com/static/logo.png';

const useStyles = makeStyles((theme) => ({
	logoContainer: {
		width: '10%',
		height: '10%',
		[theme.breakpoints.up('md')]: {
			width: '3%',
			height: '3%',
		},
	},
	container: {
		display: 'inline-flex',
		alignItems: 'center',
		flexFlow: 'row',
	},
	logoImage: {
		width: '60%',
		height: '60%',
		minWidth: 32,
		// fontWeight: theme.typography.fontWeightMedium,
		// fontSize: '13px',
		// marginRight: theme.spacing(4),
		// [theme.breakpoints.up('md')]: {
		// 	width: '60%',
		// 	height: '60%',
		// },
	},
}));

interface Props {
	themeMode: string;
	displayText?: boolean;
}

const Logo = ({
	themeMode = 'light',
	displayText = false,
}: Props): JSX.Element => {
	const classes = useStyles();
	return (
		<div className={classes.logoContainer} data-testid="logo">
			<NavLink to="/">
				<Grid container className={classes.container}>
					<Image
						className={classes.logoImage}
						src={themeMode === 'light' ? logo : logo}
						alt="almond"
						lazy={false}
					/>
					{displayText && (
						<Typography
							variant="h5"
							color="textPrimary"
							style={{ fontWeight: 600, fontSize: '16px', padding: '8px' }}
						>
							Almond
						</Typography>
					)}
				</Grid>
			</NavLink>
		</div>
	);
};

export default Logo;
