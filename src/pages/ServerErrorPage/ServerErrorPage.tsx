import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Image, LearnMoreLink } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { Section } from '@components/organisms';
import serverErrorImage from '../../assets/images/illustration_500.svg';

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

const ServerErrorPage = ({ error, resetErrorBoundary }: any): JSX.Element => {
	const classes = useStyles();

	return (
		<div>
			<Section className={classes.section}>
				<div className={classes.formContainer}>
					<Image
						src={serverErrorImage}
						alt="Server Error"
						className={classes.image}
					/>
					<SectionHeader
						title="Internal Server error!"
						subtitle={
							<span>
								We are experiencing an internal server problem. Please try again
								later or{' '}
								<LearnMoreLink
									title="contact support"
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
								onClick={resetErrorBoundary}
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

export default ServerErrorPage;
