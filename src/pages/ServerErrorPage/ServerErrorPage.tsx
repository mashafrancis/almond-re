import { Button } from '@material-ui/core';
import { Image, LearnMoreLink } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { Section } from '@components/organisms';
import Typography from '@material-ui/core/Typography';
import fancyId from '@utils/fancyId';
import { useAuthStyles } from '@pages/SignupPage/styles';
import serverErrorImage from '../../assets/images/illustration_500.svg';

const ServerErrorPage = ({ error, resetErrorBoundary }: any): JSX.Element => {
	const classes = useAuthStyles();

	return (
		<div role="alert">
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
								We are experiencing an internal server problem. Please try
								again later or{' '}
								<LearnMoreLink
									title="contact support"
									href="mailto:almond.froyo@gmail.com"
									typographyProps={{ variant: 'h6' }}
								/>
								<Typography variant="body2" color="primary">
									{error}
								</Typography>
							</span>
						}
						titleProps={{
							variant: 'h4',
						}}
						ctaGroup={[
							<Button
								key={fancyId()}
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
