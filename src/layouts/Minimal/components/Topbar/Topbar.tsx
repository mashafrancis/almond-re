import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Toolbar, Typography } from '@material-ui/core';
import { Image } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { ArrowBackRounded } from '@material-ui/icons';
import logo from '../../../../assets/images/logo.png';

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
}));

interface Props {
	themeMode: string;
	className?: string;
}

const Topbar = ({ themeMode, className, ...rest }: Props): JSX.Element => {
	const classes = useStyles();

	return (
		<Toolbar className={clsx(classes.toolbar, className)} {...rest}>
			<div className={classes.logoContainer}>
				<NavLink to="/">
					<Grid container className={classes.container}>
						<ArrowBackRounded />
						{/* <span className="product-logo-text">Home</span> */}
						<Typography className={classes.homeNavigation} variant="h5">
							Home
						</Typography>
					</Grid>
				</NavLink>
			</div>
		</Toolbar>
	);
};

export default Topbar;
