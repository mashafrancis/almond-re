import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	IconButton,
	Toolbar,
	Typography,
	AppBar,
	CssBaseline,
} from '@material-ui/core';
import { ArrowBackRounded } from '@material-ui/icons';
import { ElevationScroll } from '../../../Dashboard/components/Topbar/Topbar';

const useStyles = makeStyles((theme) => ({
	toolbar: {
		maxWidth: '100%',
		width: '100%',
		margin: '0 auto',
		padding: theme.spacing(0, 2),
		[theme.breakpoints.up('sm')]: {
			padding: theme.spacing(0, 8),
		},
	},
	appBar: {
		backgroundColor: theme.palette.background.default,
		zIndex: theme.zIndex.drawer + 1,
	},
	logoContainer: {
		width: '100%',
		height: '10%',
		[theme.breakpoints.up('md')]: {
			width: '4%',
			height: '4%',
		},
	},
	container: {
		display: 'inline-flex',
		alignItems: 'center',
		flexFlow: 'row',
	},
	logoImage: {
		width: '100%',
		height: '100%',
		[theme.breakpoints.up('md')]: {
			width: '60%',
			height: '60%',
		},
	},
	homeNavigation: {
		fontWeight: 500,
		fontSize: 16,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 14,
		paddingLeft: 8,
	},
	icon: {
		padding: 0,
		marginRight: theme.spacing(1),
		'&:hover': {
			background: 'transparent',
		},
	},
}));

interface Props {
	themeMode: string;
	className?: string;
}

const Topbar = ({ themeMode, className, ...rest }: Props): JSX.Element => {
	const classes = useStyles();
	const location = useLocation();

	return (
		<>
			<CssBaseline />
			<ElevationScroll {...rest}>
				<AppBar
					className={classes.appBar}
					position="fixed"
					elevation={0}
					data-testid="top-bar"
				>
					<Toolbar className={clsx(classes.toolbar, className)} {...rest}>
						<div className={classes.logoContainer}>
							<NavLink
								to={location.pathname === '/account' ? '/dashboard' : '/'}
							>
								<Grid container className={classes.container}>
									<IconButton
										className={clsx(
											'learn-more-link__icon-button',
											classes.icon,
										)}
										color="primary"
									>
										<ArrowBackRounded className="learn-more-link__arrow" />
									</IconButton>
									<Typography
										component="span"
										className={clsx(
											'learn-more-link__typography',
											classes.title,
										)}
										variant="h6"
										color="textPrimary"
									>
										{location.pathname === '/account' ? 'Back' : 'Home'}
									</Typography>
								</Grid>
							</NavLink>
						</div>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
		</>
	);
};

export default Topbar;
