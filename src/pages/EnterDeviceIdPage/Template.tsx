import { useState, useEffect, FormEvent, ChangeEvent, useContext } from 'react';
// third-party libraries
import { useDispatch, useSelector } from 'react-redux';
import validate from 'validate.js';
import { Button, Grid, InputAdornment, TextField } from '@material-ui/core';
import { PhonelinkSetupSharp } from '@material-ui/icons';
// components
import { UserContext } from '@context/UserContext';
// styles
import './EnterDeviceIdPage.scss';
// interfaces
import { makeStyles } from '@material-ui/core/styles';
import { Image } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { Section } from '@components/organisms';
// modules
import { verifyUserDevice } from '@modules/device';
import { EnterDeviceIdPageProps, EnterDeviceIdPageState } from './interfaces';
import { primaryColor } from '../../assets/tss/common';

import deviceImage from '../../assets/images/illustration_device.svg';
import { FormStateProps } from '../../types/FormStateProps';

const useStyles = makeStyles((theme) => {
	const toolbar = theme.mixins.toolbar as any;
	return {
		root: {
			width: '100%',
		},
		formContainer: {
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			minHeight: `calc(100vh - ${toolbar['@media (min-width:600px)'].minHeight}px)`,
			maxWidth: 500,
			margin: `0 auto`,
		},
		section: {
			paddingTop: 0,
			paddingBottom: 0,
		},
		label: {
			fontWeight: 'normal',
		},
		image: {
			[theme.breakpoints.down('sm')]: {
				maxWidth: 500,
			},
      marginBottom: 26
		},
	};
});

const schema = {
	deviceId: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 20,
			minimum: 6,
		},
	},
};

export const EnterDeviceIdTemplate = (): JSX.Element => {
	const classes = useStyles();
	const [formState, setFormState] = useState<FormStateProps>({
		isValid: false,
		values: {},
		touched: {},
		errors: {},
	});

	useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState((formState) => ({
			...formState,
			isValid: !errors,
			errors: errors || {},
		}));
	}, [formState.values]);

	const { activeDevice } = useContext(UserContext);
	const dispatch = useDispatch();
	// @ts-ignore
  const { isLoading } = useSelector(state => state?.device);
	console.log('Class: , Function: EnterDeviceIdTemplate, Line 92 user():', isLoading);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.persist();

		setFormState((formState) => ({
			...formState,
			values: {
				...formState.values,
				[event.target.name]:
					event.target.type === 'checkbox'
						? event.target.checked
						: event.target.value,
			},
			touched: {
				...formState.touched,
				[event.target.name]: true,
			},
		}));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (formState.isValid) {
			const { deviceId } = formState.values;
			await dispatch(verifyUserDevice({ id: deviceId }));
		}

		setFormState((formState) => ({
			...formState,
			touched: {
				...formState.touched,
				...formState.errors,
			},
		}));
	};

	const hasError = (field: string): boolean =>
		!!(formState.touched[field] && formState.errors[field]);

	const DeviceForm = () => (
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
							helperText={
								hasError('deviceId') ? formState.errors.deviceId[0] : null
							}
							error={hasError('deviceId')}
							onChange={handleChange}
							type="text"
							value={formState.values.deviceId || ''}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<PhonelinkSetupSharp color="primary" />
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
						>
							{isLoading ? 'Adding...' : 'Verify your device'}
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);

	return (
		<div>
			<Section className={classes.section}>
				<div className={classes.formContainer}>
					<Image
						src={deviceImage}
						alt="Almond Hydroponics"
						className={classes.image}
					/>
					<SectionHeader
						title="Add device identifier"
						subtitle={
							<span>
								The device ID will help you to control your purchased device
								from Almond. Kindly enter the 6 digit figure to start using your
								system. Configuration with the device might take a few minutes.
							</span>
						}
						titleProps={{
							variant: 'h4',
						}}
						subtitleProps={{
							variant: 'body2'
						}}
						ctaGroup={[DeviceForm()]}
						disableGutter
					/>
				</div>
			</Section>
		</div>
	);
};

export default EnterDeviceIdTemplate;
