import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	useMediaQuery,
	Grid,
	Typography,
	TextField,
	FormControlLabel,
	Switch,
	Button,
	Divider,
} from '@material-ui/core';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';

const useStyles = makeStyles((theme) => ({
	inputTitle: {
		fontWeight: 700,
		marginBottom: theme.spacing(1),
	},
	switchTitle: {
		fontWeight: 700,
	},
	titleCta: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
}));

const Security = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
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
							Change Password
						</Typography>
						<Button variant="outlined" color="primary">
							Log out
						</Button>
					</div>
				</Grid>
				<Grid item xs={12}>
					<Divider />
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Old Password"
						variant="outlined"
						size="medium"
						name="oldPassword"
						fullWidth
						type="password"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="New Password"
						variant="outlined"
						size="medium"
						name="newPassword"
						fullWidth
						type="password"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Repeat Password"
						variant="outlined"
						size="medium"
						name="repeatPassword"
						fullWidth
						type="password"
					/>
				</Grid>
				<Grid item xs={12}>
					<Divider />
				</Grid>
				{/* <Grid item xs={12}> */}
				{/*	<FormControlLabel */}
				{/*		control={<Switch color="primary" />} */}
				{/*		label={ */}
				{/*			<Typography */}
				{/*				variant="subtitle1" */}
				{/*				color="textPrimary" */}
				{/*				className={classes.switchTitle} */}
				{/*			> */}
				{/*				Expose your email */}
				{/*			</Typography> */}
				{/*		} */}
				{/*		labelPlacement="end" */}
				{/*	/> */}
				{/* </Grid> */}
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

export default Security;
