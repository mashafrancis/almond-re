import { LearnMoreLink } from '@components/atoms';
import {
	Button, Grid,


	InputAdornment, TextField, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { passwordChange } from '@modules/authentication';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import validate from 'validate.js';
import { FormStateProps } from '../../../../types/FormStateProps';

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

	const [formState, setFormState] = useState<FormStateProps>({
		isValid: false,
		values: {},
		touched: {},
		errors: {},
	});

	const [isPasswordHidden, showPassword] = useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);

	const [isConfirmPasswordHidden, showConfirmPassword] = useState<boolean>(
		false,
	);
	const toggleConfirmPassword = () =>
		showConfirmPassword((prevState) => !prevState);

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

	const query = new URLSearchParams(useLocation().search);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const token = query.get('token')!;

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (formState.isValid) {
			const { password } = formState.values;
			dispatch(passwordChange({ password, token }));
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
						<TextField
							placeholder="Confirm Password"
							label="Confirm Password *"
							variant="outlined"
							size="medium"
							name="confirmPassword"
							fullWidth
							helperText={
								hasError('confirmPassword')
									? formState.errors.confirmPassword[0]
									: null
							}
							error={hasError('confirmPassword')}
							onChange={handleChange}
							type={isConfirmPasswordHidden ? 'text' : 'password'}
							value={formState.values.confirmPassword || ''}
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
