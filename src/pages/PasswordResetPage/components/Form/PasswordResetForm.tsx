import { FormEvent, ChangeEvent, useEffect, useState } from 'react';
// third party libraries
import { useHistory, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import validate from 'validate.js';
// components
import { LearnMoreLink } from '@components/atoms';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { passwordReset } from '@modules/authentication';
// interfaces
import { FormStateProps } from '../../../../types/FormStateProps';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
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
};

interface Props {
	redirectLink: string;
}

const PasswordResetForm = ({ redirectLink }: Props): JSX.Element => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const [formState, setFormState] = useState<FormStateProps>({
		isValid: false,
		values: {},
		touched: {},
		errors: {},
	});

	useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState((prevState) => ({
			...prevState,
			isValid: !errors,
			errors: errors || {},
		}));
	}, [formState.values]);

	useEffect(() => {
		if (redirectLink) {
			history.push(redirectLink);
		}
	}, [redirectLink]);

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
			const { email } = formState.values;
			dispatch(passwordReset(email));
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
							disabled={!formState.isValid}
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
							Remember your password?{' '}
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
