import { makeStyles } from '@material-ui/core/styles';
import { Image } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { Section } from '@components/organisms';
import { Form } from '@pages/EnterDeviceIdPage/components';

const deviceImage =
	'https://storage.googleapis.com/static.almondhydroponics.com/static/images/illustration_my_device.svg';

const useStyles = makeStyles((theme) => {
	const toolbar = theme.mixins.toolbar as any;
	return {
		root: {
			width: '100%',
		},
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
			fontWeight: 'normal',
		},
		image: {
			[theme.breakpoints.down('sm')]: {
				maxWidth: 500,
			},
			width: '70%',
			marginBottom: 26,
		},
	};
});

export const EnterDeviceIdPage = (): JSX.Element => {
	const classes = useStyles();

	return (
		<>
			<Section className={classes.section}>
				<div className={classes.formContainer}>
					<Image
						src={deviceImage}
						alt="Almond Hydroponics"
						className={classes.image}
					/>
					<SectionHeader
						title="Add device identifier"
						subtitle={
							<span>
								The device ID will help you to control your purchased device
								from Almond. Kindly enter the 6 digit figure to start using your
								system. Configuration with the device might take a few minutes.
							</span>
						}
						titleProps={{
							variant: 'h4',
						}}
						subtitleProps={{
							variant: 'body2',
						}}
						disableGutter
					/>
					<Form />
				</div>
			</Section>
		</>
	);
};

export default EnterDeviceIdPage;
