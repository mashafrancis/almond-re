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
import { ViewComponentProps } from '../../../../types/ViewComponentProps';

const useStyles = makeStyles(() => ({
	titleCta: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
}));

const Notifications = ({
	className,
	...rest
}: ViewComponentProps): JSX.Element => {
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
							Notifications
						</Typography>
						<Button variant="outlined" color="primary">
							Reset all
						</Button>
					</div>
				</Grid>
				<Grid item xs={12}>
					<Divider />
				</Grid>
				<Grid item xs={12} md={4}>
					<Typography variant="h6" gutterBottom>
						System settings
					</Typography>
					<Typography variant="caption" gutterBottom>
						Receive emails to your email address
					</Typography>
					<div>
						<div>
							<FormControlLabel
								control={<Checkbox defaultChecked color="primary" />}
								label="E-mail alerts"
							/>
						</div>
						<div>
							<FormControlLabel
								control={<Checkbox defaultChecked color="primary" />}
								label="Push notifications"
							/>
						</div>
						<div>
							<FormControlLabel
								control={<Checkbox defaultChecked color="primary" />}
								label="Text messages"
							/>
						</div>
					</div>
				</Grid>
				<Grid item xs={12} md={4}>
					<Typography variant="h6" gutterBottom>
						Device settings
					</Typography>
					<Typography variant="caption" gutterBottom>
						Receive alerts from your device
					</Typography>
					<div>
						<div>
							<FormControlLabel
								control={<Checkbox defaultChecked color="primary" />}
								label="Health checks"
							/>
						</div>
						<div>
							<FormControlLabel
								control={<Checkbox defaultChecked color="primary" />}
								label="Device alerts"
							/>
						</div>
					</div>
				</Grid>
				<Grid item xs={12} md={4}>
					<Typography variant="h6" gutterBottom>
						Chat settings
					</Typography>
					<Typography variant="caption" gutterBottom>
						Receive info about your chats
					</Typography>
					<div>
						<div>
							<FormControlLabel
								control={<Checkbox defaultChecked={false} color="primary" />}
								label="E-mail alerts"
							/>
						</div>
						<div>
							<FormControlLabel
								control={<Checkbox defaultChecked color="primary" />}
								label="Push notifications"
							/>
						</div>
					</div>
				</Grid>
				<Grid item xs={12}>
					<Divider />
				</Grid>
				<Grid item container justifyContent="flex-start" xs={12}>
					<Button
						variant="contained"
						type="submit"
						color="primary"
						size="large"
					>
						Save
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default Notifications;
