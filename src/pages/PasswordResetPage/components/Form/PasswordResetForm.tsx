import { useEffect } from 'react';
// third party libraries
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import validate from 'validate.js';
// components
import { LearnMoreLink } from '@components/atoms';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { passwordReset } from '@modules/authentication';
// hooks
import useFormState from '@hooks/useFormState';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
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
};

interface Props {
	redirectLink: string;
	isLoading: boolean;
}

// eslint-disable-next-line react/prop-types
const PasswordResetForm = ({ redirectLink, isLoading }: Props): JSX.Element => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (redirectLink) {
			history.push(redirectLink);
		}
	}, [redirectLink]);

	const {
		values,
		isValid,
		errors,
		hasError,
		handleFormChange,
		handleSubmit,
	} = useFormState({
		onSubmit: ({ email }) => dispatch(passwordReset(email)),
		formErrors: (formValues) => validate(formValues, schema),
	});

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
							helperText={hasError('email') ? errors.email[0] : null}
							error={hasError('email')}
							onChange={handleFormChange}
							type="email"
							value={values.email || ''}
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
								'Send'
							)}
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Typography
							variant="subtitle1"
							color="textSecondary"
							align="center"
						>
							Remember your password?{' '}
							<LearnMoreLink title="Sign in here" href="login" />
						</Typography>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default PasswordResetForm;
