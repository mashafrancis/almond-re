import { SectionHeader } from '@components/molecules';
import { Section } from '@components/organisms';
import { useAuthStyles } from '@pages/SignupPage/styles';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store/rootReducer';
import { Form } from './components';

const SignupPage = (): JSX.Element => {
	const classes = useAuthStyles();

	const { redirect, authentication } = useSelector(
		(globalState: IRootState) => globalState,
	);
	return (
		<div>
			<Section className={classes.section}>
				<div className={classes.formContainer}>
					<SectionHeader
						title="Create account"
						titleProps={{
							variant: 'h3',
						}}
					/>
					<Form
						redirectLink={redirect.redirectLink}
						isLoading={authentication.isLoading}
					/>
				</div>
			</Section>
		</div>
	);
};

export default SignupPage;
