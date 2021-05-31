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
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Image } from '@components/atoms';
import { editUserDetails, logoutUser } from '@modules/user';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useFormState from '@hooks/useFormState';
import validate from 'validate.js';
import { useState } from 'react';
import { IRootState } from '../../../../store/rootReducer';
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
	passwordIcon: {
		cursor: 'pointer',
	},
}));

const schema = {
	password: {
		presence: { allowEmpty: false, message: 'is required' },
	},
	confirmPassword: {
		presence: { allowEmpty: false, message: 'is required' },
	},
};

const Security = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [isOldPasswordHidden, showOldPassword] = useState<boolean>(false);
	const toggleOldPassword = () => showOldPassword((prevState) => !prevState);

	const [isPasswordHidden, showPassword] = useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);

	const [isConfirmPasswordHidden, showConfirmPassword] =
		useState<boolean>(false);
	const toggleConfirmPassword = () =>
		showConfirmPassword((prevState) => !prevState);

	const { _id } = useSelector(
		(globalState: IRootState) => globalState.user.userDetails,
		shallowEqual,
	);

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	const { values, isValid, errors, hasError, handleFormChange, handleSubmit } =
		useFormState({
			onSubmit: (userDetails) => dispatch(editUserDetails(_id, userDetails)),
			formErrors: (formValues) => validate(formValues, schema),
		});

	const logoutActiveUser = async (): Promise<void> => {
		await window.location.replace('/');
		dispatch(logoutUser());
	};

	return (
		<div className={className} {...rest}>
			<form method="post" onSubmit={handleSubmit}>
				<Grid container spacing={isMd ? 4 : 2}>
					<Grid item xs={12}>
						<div className={classes.titleCta}>
							<Typography variant="h6" color="textPrimary">
								Change Password
							</Typography>
							<Button
								variant="outlined"
								color="primary"
								onClick={logoutActiveUser}
							>
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
									type={isOldPasswordHidden ? 'text' : 'password'}
									InputProps={{
										endAdornment: (
											<InputAdornment
												className={classes.passwordIcon}
												onClick={toggleOldPassword}
												position="end"
											>
												<IconButton aria-label="old-password" edge="end">
													{isOldPasswordHidden ? (
														<Visibility color="primary" />
													) : (
														<VisibilityOff color="primary" />
													)}
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
									type={isPasswordHidden ? 'text' : 'password'}
									InputProps={{
										endAdornment: (
											<InputAdornment
												className={classes.passwordIcon}
												onClick={togglePassword}
												position="end"
											>
												<IconButton aria-label="new-password" edge="end">
													{isPasswordHidden ? (
														<Visibility color="primary" />
													) : (
														<VisibilityOff color="primary" />
													)}
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
									type={isConfirmPasswordHidden ? 'text' : 'password'}
									InputProps={{
										endAdornment: (
											<InputAdornment
												className={classes.passwordIcon}
												onClick={toggleConfirmPassword}
												position="end"
											>
												<IconButton aria-label="old-password" edge="end">
													{isConfirmPasswordHidden ? (
														<Visibility color="primary" />
													) : (
														<VisibilityOff color="primary" />
													)}
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
			</form>
		</div>
	);
};

export default Security;
