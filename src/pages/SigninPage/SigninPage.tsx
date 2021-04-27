import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { LearnMoreLink } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { Section } from '@components/organisms';
import { useSelector } from 'react-redux';
import { Form } from './components';
import { IRootState } from '../../store/rootReducer';

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
	};
});

const SigninPage = (): JSX.Element => {
	const classes = useStyles();

	return (
		<div>
			<Section className={classes.section}>
				<div className={classes.formContainer}>
					<SectionHeader
						title="Sign in"
						subtitle={
							<span>
								Don’t have an account?{' '}
								<NavLink to="/register">
									<LearnMoreLink
										title="Sign up."
										typographyProps={{ variant: 'h6' }}
									/>
								</NavLink>
							</span>
						}
						titleProps={{
							variant: 'h3',
						}}
					/>
					<Form />
				</div>
			</Section>
		</div>
	);
};

export default SigninPage;
