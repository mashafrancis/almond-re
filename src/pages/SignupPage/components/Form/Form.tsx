import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
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
import { createAccount } from '@modules/authentication';
import { FormStateProps } from '../../../../types/FormStateProps';
import googleIcon from '../../../../assets/images/icons/google-login-icon.svg';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	iconImage: {
		width: '100%',
		height: '100%',
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
	firstName: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 120,
		},
	},
	lastName: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 120,
		},
	},
	password: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			minimum: 8,
		},
	},
};

const Form = (): JSX.Element => {
	const classes = useStyles();

	const [formState, setFormState] = useState<FormStateProps>({
		isValid: false,
		values: {},
		touched: {},
		errors: {},
	});

	const [isPasswordHidden, showPassword] = useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState((prevState) => ({
			...prevState,
			isValid: !errors,
			errors: errors || {},
		}));
	}, [formState.values]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.persist();

		setFormState((prevState) => ({
			...prevState,
			values: {
				...prevState.values,
				[event.target.name]:
					event.target.type === 'checkbox'
						? event.target.checked
						: event.target.value,
			},
			touched: {
				...prevState.touched,
				[event.target.name]: true,
			},
		}));
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (formState.isValid) {
			const { firstName, lastName, email, password } = formState.values;
			dispatch(createAccount({ firstName, lastName, email, password }));
			// history.push('register-success');
		}

		setFormState((prevState) => ({
			...prevState,
			touched: {
				...prevState.touched,
				...prevState.errors,
			},
		}));
	};

	const hasError = (field: string): boolean =>
		!!(formState.touched[field] && formState.errors[field]);

	const handleLogin = () =>
		window.location.replace(`${process.env.ALMOND_API}/auth/google`);

	return (
		<div className={classes.root}>
			<form name="signup-form" method="post" onSubmit={handleSubmit}>
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

					<Grid item xs={6}>
						<TextField
							label="First name *"
							variant="outlined"
							size="medium"
							name="firstName"
							fullWidth
							helperText={
								hasError('firstName') ? formState.errors.firstName[0] : null
							}
							error={hasError('firstName')}
							onChange={handleChange}
							type="text"
							value={formState.values.firstName || ''}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Last name *"
							variant="outlined"
							size="medium"
							name="lastName"
							fullWidth
							helperText={
								hasError('lastName') ? formState.errors.lastName[0] : null
							}
							error={hasError('lastName')}
							onChange={handleChange}
							type="text"
							value={formState.values.lastName || ''}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
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
						<Button
							size="large"
							variant="contained"
							type="submit"
							color="primary"
							fullWidth
							disabled={!formState.isValid}
						>
							Register
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Typography
							variant="subtitle2"
							color="textSecondary"
							align="center"
						>
							Already have an account?{' '}
							<NavLink to="/login">
								<LearnMoreLink title="Sign in" />
							</NavLink>
						</Typography>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default Form;
