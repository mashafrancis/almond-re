import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { LearnMoreLink } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { Section } from '@components/organisms';

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
	};
});

const RegisterSuccessPage = (): JSX.Element => {
	const classes = useStyles();

	return (
		<div>
			<Section className={classes.section}>
				<div className={classes.formContainer}>
					<SectionHeader
						label="Hurray!!"
						title="Account creation successful."
						subtitle={
							<span>
								A confirmation email has been sent to your account. Kindly
								confirm your account before proceeding.
							</span>
						}
						titleProps={{
							variant: 'h4',
							color: 'primary',
						}}
						labelProps={{
							color: 'secondary',
							className: classes.label,
							variant: 'h5',
						}}
						disableGutter
					/>
				</div>
			</Section>
		</div>
	);
};

export default RegisterSuccessPage;
