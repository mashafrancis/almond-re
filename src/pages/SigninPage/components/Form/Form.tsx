import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
	Typography,
	Grid,
	Button,
	TextField,
	InputAdornment,
} from '@material-ui/core';
import validate from 'validate.js';
import { DividerWithText, Image, LearnMoreLink } from '@components/atoms';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useDispatch } from 'react-redux';
import { loginAccount } from '@modules/authentication';
import { FormStateProps } from '../../../../types/FormStateProps';
import googleIcon from '../../../../assets/images/icons/google-login-icon.svg';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	passwordIcon: {
		cursor: 'pointer',
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

const Form = (): JSX.Element => {
	const classes = useStyles();

	const [formState, setFormState] = React.useState<FormStateProps>({
		isValid: false,
		values: {},
		touched: {},
		errors: {},
	});

	const [isPasswordHidden, showPassword] = React.useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);

	const dispatch = useDispatch();

	React.useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState((state) => ({
			...state,
			isValid: !errors,
			errors: errors || {},
		}));
	}, [formState.values]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.persist();

		setFormState((state) => ({
			...state,
			values: {
				...state.values,
				[event.target.name]:
					event.target.type === 'checkbox'
						? event.target.checked
						: event.target.value,
			},
			touched: {
				...state.touched,
				[event.target.name]: true,
			},
		}));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (formState.isValid) {
			const { email, password } = formState.values;
			dispatch(loginAccount({ email, password }));
		}

		setFormState((state) => ({
			...state,
			touched: {
				...state.touched,
				...state.errors,
			},
		}));
	};

	const hasError = (field: string): boolean =>
		!!(formState.touched[field] && formState.errors[field]);

	const handleLogin = () =>
		window.location.replace(`${process.env.ALMOND_API}/auth/google`);

	return (
		<div className={classes.root}>
			<form name="password-reset-form" method="post" onSubmit={handleSubmit}>
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
							helperText={hasError('email') ? formState.errors.email[0] : null}
							error={hasError('email')}
							onChange={handleChange}
							type="email"
							value={formState.values.email || ''}
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
							helperText={
								hasError('password') ? formState.errors.password[0] : null
							}
							error={hasError('password')}
							onChange={handleChange}
							type={isPasswordHidden ? 'text' : 'password'}
							value={formState.values.password || ''}
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
						>
							Login
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
								<LearnMoreLink title="Reset password" href="/password-reset" />
							</NavLink>
						</Typography>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default Form;
