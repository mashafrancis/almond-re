import { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, useMediaQuery } from '@material-ui/core';
import { Image } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { HeroShaped } from '@components/organisms';
import { NavLink } from 'react-router-dom';
import isArrayNotNull from '@utils/checkArrayEmpty';
import { UserContext } from '@context/UserContext';
import authService from '@utils/auth';
import fancyId from '@utils/fancyId';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';

const useStyles = makeStyles((theme) => ({
	root: {
		// height: '70vh',
		// background:
		// 	'url(https://assets.maccarianagency.com/the-front/illustrations/patterns-bg.svg) no-repeat left bottom',
		backgroundSize: 'contain',
		backgroundColor: theme.palette.alternate.main,
	},
	cover: {
		position: 'relative',
		zIndex: 9,
		width: '100%',
		height: '100%',
	},
	image: {
		objectFit: 'cover',
	},
}));

const HeroAlt = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
	const classes = useStyles();
	const { devices } = useContext(UserContext);
	const isAuthed = authService.isAuthenticated();

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<div className={clsx(classes.root, className)} {...rest}>
			<HeroShaped
				leftSide={
					<SectionHeader
						title={<span>Grow your food and live happily healthy.</span>}
						subtitle="Focus on the safe production of fresh food from your own home all year round."
						subtitleColor="textPrimary"
						ctaGroup={[
							<NavLink
								key={fancyId()}
								to={
									isAuthed
										? `${isArrayNotNull(devices) ? '/dashboard' : '/my-device'}`
										: '/store'
								}
							>
								<Button variant="contained" color="primary">
									{isAuthed ? 'Go to dashboard' : 'Visit our store'}
									<NavigateNextRoundedIcon />
								</Button>
							</NavLink>,
						]}
						align={isMd ? 'left' : 'center'}
						disableGutter
						titleVariant="h3"
					/>
				}
				rightSide={
					<div className={classes.cover}>
						<Image
							src="https://storage.googleapis.com/static.almondhydroponics.com/static/images/hydroponics.webp"
							srcSet="https://storage.googleapis.com/static.almondhydroponics.com/static/images/hydroponics.webp 2x"
							className={classes.image}
							lazyProps={{
								width: '100%',
								height: '100%',
							}}
						/>
					</div>
				}
			/>
		</div>
	);
};

export default HeroAlt;
