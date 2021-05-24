import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	useMediaQuery,
	Grid,
	Typography,
	TextField,
	Button,
	Divider,
	InputAdornment,
	IconButton,
} from '@material-ui/core';
import { VisibilityOffTwoTone, VisibilityTwoTone } from '@material-ui/icons';
import { Image } from '@components/atoms';
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
	image: {
		maxWidth: 350,
		borderRadius: 10,
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
				<Grid item xs={12} md={6}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								label="Old Password"
								variant="outlined"
								size="medium"
								name="oldPassword"
								fullWidth
								type="password"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton aria-label="old-password" edge="end">
												<VisibilityTwoTone color="primary" />
											</IconButton>
										</InputAdornment>
									),
								}}
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
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton aria-label="old-password" edge="end">
												<VisibilityOffTwoTone color="primary" />
											</IconButton>
										</InputAdornment>
									),
								}}
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
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton aria-label="old-password" edge="end">
												<VisibilityOffTwoTone color="primary" />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								fullWidth
								variant="contained"
								type="submit"
								color="primary"
								size="large"
							>
								Save
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					item
					container
					justifyContent={isMd ? 'flex-start' : 'center'}
					xs={12}
					md={6}
				>
					<Image
						src="https://storage.googleapis.com/static.almondhydroponics.com/static/images/password-secure.svg"
						srcSet="https://storage.googleapis.com/static.almondhydroponics.com/static/images/password-secure.svg 2x"
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

export default Security;
