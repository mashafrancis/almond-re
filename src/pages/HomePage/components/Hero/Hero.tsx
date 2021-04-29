import { useContext } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Button, Typography } from '@material-ui/core';
import { Image } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { Section } from '@components/organisms';
import authService from '@utils/auth';
import { UserContext } from '@context/UserContext';
import isArrayNotNull from '@utils/checkArrayEmpty';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';

const homeImage =
	'https://static.almondhydroponics.com/static/images/homehero.svg';

const useStyles = makeStyles((theme) => ({
	root: {
		// background:
		// 	'url(https://assets.maccarianagency.com/the-front/illustrations/patterns-bg.svg) no-repeat left bottom',
		backgroundSize: 'contain',
		backgroundColor: 'rgb(247, 249, 252)',
		// height: '100vh',
	},
	pagePaddingTop: {
		paddingTop: theme.spacing(4),
		[theme.breakpoints.up('md')]: {
			paddingTop: theme.spacing(5),
		},
	},
	cover: {
		position: 'relative',
		zIndex: 9,
		width: '100%',
		height: '100%',
	},
	image: {
		[theme.breakpoints.down('sm')]: {
			maxWidth: 500,
		},
	},
}));

const Hero = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
	const classes = useStyles();

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});
	const isAuthed = authService.isAuthenticated();
	const { devices } = useContext(UserContext);

	return (
		<div className={clsx(classes.root, className)} {...rest}>
			<Section className={classes.pagePaddingTop}>
				<Grid container justify="space-between" spacing={isMd ? 4 : 2}>
					<Grid item xs={12} md={6} data-aos="fade-up">
						<SectionHeader
							title={
								// <span>
								// 	Welcome to{' '}
								// 	<Typography
								// 		component="span"
								// 		variant="inherit"
								// 		color="primary"
								// 	>
								// 		Almond.
								// 	</Typography>
								// 	<br />
								// 	<span>Grow your food and live happily healthy.</span>
								// </span>
								<span>Grow your food and live happily healthy.</span>
							}
							subtitle="Focus on the safe production of fresh food from your own home all year round."
							ctaGroup={[
								<NavLink
									to={
										isAuthed
											? `${
													isArrayNotNull(devices) ? '/dashboard' : '/my-device'
											  }`
											: '/store'
									}
								>
									<Button variant="contained" color="primary">
										{isAuthed ? 'Go to dashboard' : 'Visit our store'}
									</Button>
								</NavLink>,
							]}
							align={isMd ? 'left' : 'center'}
							disableGutter
							titleVariant="h3"
						/>
					</Grid>
					<Grid
						item
						container
						justify="center"
						alignItems="center"
						xs={12}
						md={6}
						data-aos="fade-up"
					>
						<Image
							src={homeImage}
							alt="Almond Hydroponics"
							className={classes.image}
						/>
					</Grid>
				</Grid>
			</Section>
		</div>
	);
};

export default Hero;
