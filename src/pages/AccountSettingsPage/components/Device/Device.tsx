import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	useMediaQuery,
	Grid,
	Typography,
	FormControlLabel,
	Checkbox,
	Button,
	Divider,
} from '@material-ui/core';
import { Form } from '@pages/EnterDeviceIdPage/components';
import { SectionHeader } from '@components/molecules';
import { Image } from '@components/atoms';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';

const useStyles = makeStyles(() => ({
	titleCta: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	image: {
		maxWidth: 350,
		borderRadius: 10,
	},
}));

const Device = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
	const classes = useStyles();

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<div className={className} {...rest}>
			<Grid container spacing={isMd ? 4 : 2}>
				<Grid item xs={12}>
					<div className={classes.titleCta}>
						<Typography variant="h6" color="textPrimary">
							Add new device
						</Typography>
					</div>
				</Grid>
				<Grid item xs={12}>
					<Divider />
				</Grid>
				<Grid item xs={12} md={6}>
					<SectionHeader
						title={
							<span>
								The device ID will help you to control your purchased device
								from Almond. Kindly enter the 6 digit figure to start using
								your system. Configuration with the device might take a few
								minutes.
							</span>
						}
						titleProps={{
							variant: 'body2',
							color: 'textSecondary',
						}}
					/>
					<Form />
				</Grid>
				<Grid
					item
					container
					justifyContent={isMd ? 'flex-start' : 'center'}
					xs={12}
					md={6}
				>
					<Image
						src="https://storage.googleapis.com/static.almondhydroponics.com/static/images/illustration_my_device.svg"
						srcSet="https://storage.googleapis.com/static.almondhydroponics.com/static/images/illustration_my_device.svg 2x"
						className={classes.image}
					/>
				</Grid>
				<Grid item xs={12}>
					<Divider />
				</Grid>
			</Grid>
		</div>
	);
};

export default Device;
