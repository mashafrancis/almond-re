import { Image } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { Section } from '@components/organisms';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store/rootReducer';
import { Button } from '@material-ui/core';
import fancyId from '@utils/fancyId';
import { useAuthStyles } from '@pages/SignupPage/styles';
import { useHistory } from 'react-router-dom';

const registerSuccessImage =
	'https://storage.googleapis.com/static.almondhydroponics.com/static/images/register_success.svg';

const SuccessPage = (): JSX.Element => {
	const classes = useAuthStyles();
	const history = useHistory();

	const handleClick = (): void => history.push('/');

	const { redirectMessage } = useSelector(
		(globalState: IRootState) => globalState.redirect,
	);

	return (
		<div>
			<Section className={classes.section}>
				<div className={classes.formContainer}>
					<Image
						src={registerSuccessImage}
						alt="Almond Hydroponics"
						className={classes.image}
					/>
					<SectionHeader
						label="Hurray!!"
						title=""
						subtitle={<span>{redirectMessage}</span>}
						titleProps={{
							variant: 'h6',
						}}
						labelProps={{
							color: 'primary',
							className: classes.label,
							variant: 'h5',
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
		</div>
	);
};

export default SuccessPage;
