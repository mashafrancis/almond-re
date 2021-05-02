import { makeStyles } from '@material-ui/core/styles';
import { Image } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { HeroShaped } from '@components/organisms';
import { PasswordResetForm } from '@pages/PasswordResetPage/components/Form';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store/rootReducer';

const useStyles = makeStyles((theme) => {
	const toolbar = theme.mixins.toolbar as any;
	return {
		root: {
			'& .hero-shaped': {
				borderBottom: 0,
			},
			'& .hero-shaped__wrapper': {
				[theme.breakpoints.up('md')]: {
					minHeight: `calc(100vh - ${toolbar['@media (min-width:600px)'].minHeight}px)`,
				},
			},
		},
		formContainer: {
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			[theme.breakpoints.down('sm')]: {
				maxWidth: 500,
				margin: `0 auto`,
			},
		},
		image: {
			objectFit: 'cover',
		},
	};
});

const PasswordResetPage = (): JSX.Element => {
	const classes = useStyles();

	const { redirect, authentication } = useSelector(
		(globalState: IRootState) => globalState,
	);

	return (
		<div className={classes.root}>
			<HeroShaped
				leftSide={
					<div className={classes.formContainer}>
						<SectionHeader
							title="Password reset"
							subtitle="Enter your email to reset your password."
							titleProps={{
								variant: 'h3',
							}}
						/>
						<PasswordResetForm
							redirectLink={redirect.redirectLink}
							isLoading={authentication.isLoading}
						/>
					</div>
				}
				rightSide={
					<Image
						src="https://assets.maccarianagency.com/the-front/photos/account/cover-4.jpg"
						className={classes.image}
						lazy={false}
					/>
				}
			/>
		</div>
	);
};

export default PasswordResetPage;
