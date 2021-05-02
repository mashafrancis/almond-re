import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, InputAdornment, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import validate from 'validate.js';
import useFormState from '@hooks/useFormState';
import { PhonelinkSetupSharp } from '@material-ui/icons';
import { verifyUserDevice } from '@modules/device';
import { IRootState } from '../../../../store/rootReducer';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
}));

const schema = {
	deviceId: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 20,
			minimum: 6,
		},
	},
};

const Form = (): JSX.Element => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const { isLoading } = useSelector((state: IRootState) => state.device);

	const {
		values,
		isValid,
		errors,
		hasError,
		handleFormChange,
		handleSubmit,
	} = useFormState({
		onSubmit: async ({ deviceId }) =>
			dispatch(verifyUserDevice({ id: deviceId })),
		formErrors: (formValues) => validate(formValues, schema),
	});

	return (
		<div className={classes.root}>
			<form name="enter-device-form" method="post" onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							label="Enter device ID"
							name="deviceId"
							variant="outlined"
							size="medium"
							fullWidth
							helperText={hasError('deviceId') ? errors.deviceId[0] : null}
							error={hasError('deviceId')}
							onChange={handleFormChange}
							type="text"
							value={values.deviceId || ''}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<PhonelinkSetupSharp
											color={hasError('deviceId') ? 'error' : 'primary'}
										/>
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
							{isLoading ? 'Adding...' : 'Verify your device'}
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default Form;
