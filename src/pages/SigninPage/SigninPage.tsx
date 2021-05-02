import { LearnMoreLink } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { Section } from '@components/organisms';
import { useAuthStyles } from '@pages/SignupPage/styles';
import { useSelector } from 'react-redux';
import { Form } from './components';
import { IRootState } from '../../store/rootReducer';

const SigninPage = (): JSX.Element => {
	const classes = useAuthStyles();

	const { authentication } = useSelector(
		(globalState: IRootState) => globalState,
	);

	return (
		<div>
			<Section className={classes.section}>
				<div className={classes.formContainer}>
					<SectionHeader
						title="Sign in"
						subtitle={
							<span>
								Don’t have an account?{' '}
								<LearnMoreLink
									title="Sign up."
									typographyProps={{ variant: 'h6' }}
									href="register"
								/>
							</span>
						}
						titleProps={{
							variant: 'h3',
						}}
					/>
					<Form isLoading={authentication.isLoading} />
				</div>
			</Section>
		</div>
	);
};

export default SigninPage;
