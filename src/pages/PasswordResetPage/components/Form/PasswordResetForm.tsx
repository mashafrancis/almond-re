import { LearnMoreLink } from '@components/atoms';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { passwordReset } from '@modules/authentication';
import { FormEvent, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import validate from 'validate.js';
import { FormStateProps } from '../../../../types/FormStateProps';
import { useHistory } from 'react-router-dom';

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

// eslint-disable-next-line react/prop-types
const PasswordResetForm = ({ redirectLink }: Props): JSX.Element => {
	const classes = useStyles();

	const dispatch = useDispatch();

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

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

	const history = useHistory();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (formState.isValid) {
			const { email } = formState.values;
			dispatch(passwordReset(email));
		}

		if (redirectLink) {
			history.push(redirectLink);
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

export const mapStateToProps = (state) => ({
	redirectTo: state.redirectTo,
});

export default connect(mapStateToProps)(PasswordResetForm);
