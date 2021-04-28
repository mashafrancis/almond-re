import { useState } from 'react';
import { LearnMoreLink } from '@components/atoms';
import {
	Button,
	Grid,
	InputAdornment,
	TextField,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { passwordChange } from '@modules/authentication';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import validate from 'validate.js';
import useFormState from '@hooks/useFormState';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
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

const PasswordResetForm = (): JSX.Element => {
	const classes = useStyles();

	const dispatch = useDispatch();

	const [isPasswordHidden, showPassword] = useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);

	const [isConfirmPasswordHidden, showConfirmPassword] = useState<boolean>(
		false,
	);
	const toggleConfirmPassword = () =>
		showConfirmPassword((prevState) => !prevState);

	const query = new URLSearchParams(useLocation().search);
	const token: string = query?.get('token') ?? 'invalid-token';

	const {
		values,
		isValid,
		errors,
		hasError,
		handleFormChange,
		handleSubmit,
	} = useFormState({
		onSubmit: ({ password }) => dispatch(passwordChange({ password, token })),
		formErrors: (formValues) => validate(formValues, schema),
	});

	return (
		<div className={classes.root}>
			<form name="password-reset-form" method="post" onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							placeholder="Password"
							label="Password *"
							variant="outlined"
							size="medium"
							name="password"
							fullWidth
							helperText={hasError('password') ? errors.password[0] : null}
							error={hasError('password')}
							onChange={handleFormChange}
							type={isPasswordHidden ? 'text' : 'password'}
							value={values.password || ''}
							InputProps={{
								endAdornment: (
									<InputAdornment
										className={classes.passwordIcon}
										onClick={togglePassword}
										position="end"
									>
										{isPasswordHidden ? (
											<VisibilityIcon />
										) : (
											<VisibilityOffIcon />
										)}
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							placeholder="Confirm Password"
							label="Confirm Password *"
							variant="outlined"
							size="medium"
							name="confirmPassword"
							fullWidth
							helperText={
								hasError('confirmPassword') ? errors.confirmPassword[0] : null
							}
							error={hasError('confirmPassword')}
							onChange={handleFormChange}
							type={isConfirmPasswordHidden ? 'text' : 'password'}
							value={values.confirmPassword || ''}
							InputProps={{
								endAdornment: (
									<InputAdornment
										className={classes.passwordIcon}
										onClick={toggleConfirmPassword}
										position="end"
									>
										{isConfirmPasswordHidden ? (
											<VisibilityIcon />
										) : (
											<VisibilityOffIcon />
										)}
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="subtitle2">
							Fields that are marked with * sign are required.
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Button
							size="large"
							variant="contained"
							type="submit"
							color="primary"
							fullWidth
							disabled={!isValid}
						>
							Send
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Typography
							variant="subtitle1"
							color="textSecondary"
							align="center"
						>
							<NavLink to="/login">
								<LearnMoreLink title="Sign in here" href="/signin-cover" />
							</NavLink>
						</Typography>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default PasswordResetForm;
