import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
	Button,
	Grid,
	InputAdornment,
	TextField,
	Typography,
} from '@material-ui/core';
import { DividerWithText, Image, LearnMoreLink } from '@components/atoms';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useDispatch } from 'react-redux';
import { loginAccount } from '@modules/authentication';
import validate from 'validate.js';
import useFormState from '@hooks/useFormState';
import CircularProgress from '@material-ui/core/CircularProgress';
import googleIcon from '../../../../assets/images/icons/google-login-icon.svg';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	passwordIcon: {
		cursor: 'pointer',
	},
	progressIcon: {
		color: theme.palette.primary.contrastText,
	},
}));

const schema = {
	email: {
		presence: { allowEmpty: false, message: 'is required' },
		email: true,
		length: {
			maximum: 300,
		},
	},
	password: {
		presence: { allowEmpty: false, message: 'is required' },
	},
};

interface Props {
	isLoading: boolean;
}

const Form = ({ isLoading }: Props): JSX.Element => {
	const classes = useStyles();

	const [isPasswordHidden, showPassword] = useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);

	const dispatch = useDispatch();

	const {
		values,
		isValid,
		errors,
		hasError,
		handleFormChange,
		handleSubmit,
	} = useFormState({
		onSubmit: ({ email, password }) =>
			dispatch(loginAccount({ email, password })),
		formErrors: (formValues) => validate(formValues, schema),
	});

	const handleLogin = () =>
		window.location.replace(`${process.env.ALMOND_API}/auth/google`);

	return (
		<div className={classes.root}>
			<form name="login-form" method="post" onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Button
							size="large"
							variant="outlined"
							fullWidth
							startIcon={<Image src={googleIcon} />}
							onClick={handleLogin}
						>
							Continue with Google
						</Button>
					</Grid>

					<Grid item xs={12}>
						<DividerWithText>OR</DividerWithText>
					</Grid>

					<Grid item xs={12}>
						<TextField
							placeholder="Email"
							label="Email *"
							variant="outlined"
							size="medium"
							name="email"
							fullWidth
							helperText={hasError('email') ? errors.email[0] : null}
							error={hasError('email')}
							onChange={handleFormChange}
							type="email"
							value={values.email || ''}
						/>
					</Grid>
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
							{isLoading ? (
								<CircularProgress className={classes.progressIcon} size="2em" />
							) : (
								'Login'
							)}
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Typography
							variant="subtitle1"
							color="textSecondary"
							align="center"
						>
							Forgot your password?{' '}
							<NavLink to="/password-reset">
								<LearnMoreLink title="Reset password" />
							</NavLink>
						</Typography>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default Form;
