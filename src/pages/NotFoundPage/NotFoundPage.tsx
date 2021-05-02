import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Image, LearnMoreLink } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { Section } from '@components/organisms';
import fancyId from '@utils/fancyId';
import { useAuthStyles } from '@pages/SignupPage/styles';
import notFoundImage from '../../assets/images/illustration_404.svg';

const NotFoundPage = (): JSX.Element => {
	const classes = useAuthStyles();

	const handleClick = (): void => {
		window.history.back();
	};

	return (
		<>
			<Section className={classes.section} data-testid="not-found">
				<div className={classes.formContainer}>
					<Image
						src={notFoundImage}
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
								key={fancyId()}
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
		</>
	);
};

export default NotFoundPage;
