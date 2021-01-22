import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Image, LearnMoreLink } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { Section } from '@components/organisms';
import homeImage from '../../assets/images/illustration_404.svg';

const useStyles = makeStyles((theme) => {
	const toolbar = theme.mixins.toolbar as any;
	return {
		formContainer: {
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			minHeight: `calc(100vh - ${toolbar['@media (min-width:600px)'].minHeight}px)`,
			maxWidth: 500,
			margin: `0 auto`,
		},
		section: {
			paddingTop: 0,
			paddingBottom: 0,
		},
		label: {
			fontWeight: 'bold',
		},
		image: {
			[theme.breakpoints.down('sm')]: {
				maxWidth: 500,
			},
		},
	};
});

const NotFoundPage = (): JSX.Element => {
	const classes = useStyles();

	const handleClick = (): void => {
		window.history.back();
	};

	return (
		<div>
			<Section className={classes.section}>
				<div className={classes.formContainer}>
					<Image
						src={homeImage}
						alt="Almond Hydroponics"
						className={classes.image}
					/>
					<SectionHeader
						title="Sorry, page not found!"
						subtitle={
							<span>
								There’s nothing here, but if you feel this is an error please{' '}
								<LearnMoreLink
									title="let us know"
									href="mailto:almond.froyo@gmail.com"
									typographyProps={{ variant: 'h6' }}
								/>
							</span>
						}
						titleProps={{
							variant: 'h4',
						}}
						ctaGroup={[
							<Button
								size="medium"
								variant="contained"
								color="primary"
								onClick={handleClick}
							>
								Go Back
							</Button>,
						]}
						disableGutter
					/>
				</div>
			</Section>
		</div>
	);
};

export default NotFoundPage;
