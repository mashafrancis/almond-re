import { useState, ChangeEvent, useContext } from 'react';
// third-party libraries
import { Container, Grid, InputAdornment, TextField } from '@material-ui/core';
import { PhonelinkSetupSharp } from '@material-ui/icons';
// components
import { Cell, Row } from '@material/react-layout-grid';
import NavigationHeader from '@components/NavigationHeader';
import { UserContext } from '@context/UserContext';
import ActionButton from '@components/ActionButton';
// styles
import './EnterDeviceIdPage.scss';
import useStyles from '@pages/EnterDeviceIdPage/styles';
import { primaryColor } from '../../assets/tss/common';
// interfaces
import { EnterDeviceIdPageProps, EnterDeviceIdPageState } from './interfaces';

export const EnterDeviceIdTemplate = ({
	verifyUserDevice,
	isLoading,
}: EnterDeviceIdPageProps): JSX.Element => {
	const [state, setState] = useState<EnterDeviceIdPageState>({
		isLoading: false,
	});

	const [deviceId, setDeviceId] = useState('');
	const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setDeviceId(e.target.value);
	};

	const { activeDevice } = useContext(UserContext);

	const onSubmit = () => {
		const device = { id: deviceId };
		setState({ ...state, isLoading: true });

		verifyUserDevice(device).then(() => {
			// await props.getUserDetails();
			setState({ ...state, isLoading: false });
		});
	};

	const classes = useStyles();

	const renderDeviceTextField = () => (
		<div className="form-cell">
			<TextField
				label="Enter device ID"
				defaultValue={deviceId}
				className={`${classes.root} mdc-text-field--fullwidth`}
				variant="outlined"
				onChange={handleValueChange}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<PhonelinkSetupSharp style={{ color: primaryColor }} />
						</InputAdornment>
					),
				}}
			/>
		</div>
	);

	return (
		<div className="enter-device-id">
			<NavigationHeader
				forwardButtonName={activeDevice ? 'Skip' : 'Home'}
				backwardButtonName="Back"
				forwardLink={activeDevice ? '/dashboard' : '/'}
				backwardLink="/"
			/>
			<Container maxWidth="sm">
				<Grid>
					<Row>
						<Cell
							columns={12}
							desktopColumns={12}
							tabletColumns={8}
							phoneColumns={4}
						>
							<h1 className="headline-2">Add device identifier</h1>
							<h5>
								The device ID will help you to control your purchased device
								from Almond. Kindly enter the 6 digit figure to start using your
								system. Configuration with the device might take a few minutes
								to complete.
							</h5>
						</Cell>
					</Row>
					<Row className="device-id-page">
						<Cell
							columns={12}
							desktopColumns={12}
							tabletColumns={8}
							phoneColumns={4}
						>
							{renderDeviceTextField()}
						</Cell>
					</Row>
					<Row className="device-id-page">
						<Cell
							columns={8}
							desktopColumns={8}
							tabletColumns={4}
							phoneColumns={2}
						>
							<ActionButton
								name={isLoading ? 'Adding...' : 'Verify your device'}
								variant="contained"
								handleClick={onSubmit}
							/>
						</Cell>
					</Row>
				</Grid>
			</Container>
		</div>
	);
};

export default EnterDeviceIdTemplate;
