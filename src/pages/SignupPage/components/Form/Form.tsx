import { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import useFormState from '@hooks/useFormState';
import { createAccount } from '@modules/authentication';
import CircularProgress from '@material-ui/core/CircularProgress';
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

interface Props {
	redirectLink: string;
	isLoading: boolean;
}

const Form = ({ redirectLink, isLoading }: Props): JSX.Element => {
	const classes = useStyles();
	const [field, useField] = useState<string>('');

	const allowedFields: string[] = [];

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		useField(() => event.target.name);
		handleFormChange(event);
	};

	useEffect(() => {
		allowedFields.push(field);
	}, [field]);

	const filtered = Object.keys(schema)
		.filter((key) => allowedFields.includes(key))
		.reduce((obj, key) => {
			obj[key] = schema[key];
			return obj;
		}, {});

	const [isPasswordHidden, showPassword] = useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);

	const dispatch = useDispatch();

	const history = useHistory();

	useEffect(() => {
		if (redirectLink) {
			history.push(redirectLink);
		}
	}, [redirectLink]);

	const { values, isValid, errors, hasError, handleFormChange, handleSubmit } =
		useFormState({
			onSubmit: ({ firstName, lastName, email, password }) =>
				dispatch(createAccount({ firstName, lastName, email, password })),
			formErrors: (formValues) => validate(formValues, schema),
		});

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
							helperText={hasError('firstName') ? errors.firstName[0] : null}
							error={hasError('firstName')}
							onChange={handleChange}
							type="text"
							value={values.firstName || ''}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Last name *"
							variant="outlined"
							size="medium"
							name="lastName"
							fullWidth
							helperText={hasError('lastName') ? errors.lastName[0] : null}
							error={hasError('lastName')}
							onChange={handleFormChange}
							type="text"
							value={values.lastName || ''}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
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
						<Button
							size="large"
							variant="contained"
							type="submit"
							color="primary"
							fullWidth
							disabled={!isValid}
						>
							{isLoading ? (
								<CircularProgress
									className={classes.progressIcon}
									size="2em"
								/>
							) : (
								'Register'
							)}
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Typography
							variant="subtitle2"
							color="textSecondary"
							align="center"
						>
							Already have an account?{' '}
							<LearnMoreLink title="Sign in" href="login" />
						</Typography>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default Form;
