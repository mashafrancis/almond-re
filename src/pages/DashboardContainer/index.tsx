import {
	useState,
	useEffect,
	useContext,
	ChangeEvent,
	createElement,
} from 'react';
// third-party libraries
import {
	Grid,
	InputAdornment,
	MenuItem,
	SwipeableDrawer,
	TextField,
} from '@material-ui/core';
import { useSubscription } from '@hooks/mqtt';
import { getSensorData } from '@modules/sensorData';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// icons
import { AllOutTwoTone, Face } from '@material-ui/icons';
// components;
import { AdminMenus, UserMenus } from '@components/molecules';
import { ActivityLogCard, Modal, TabPanel } from '@components/atoms';
// utils
import { UserContext } from '@context/UserContext';
import { ComponentContext } from '@context/ComponentContext';
import isArrayNotNull from '@utils/checkArrayEmpty';
// interfaces
import { IClientSubscribeOptions } from 'mqtt';
// styles
import { useDashboardContainerStyles } from '@pages/DashboardContainer/styles';
import Typography from '@material-ui/core/Typography';
import { BlankContent } from '@pages/WaterCyclesPage';
import { useHistory } from 'react-router-dom';
import { editUserDetails } from '@modules/user';
import { activateDevice } from '@modules/device';
import { DashboardContainerState } from './interfaces';
import { primaryColor } from '../../assets/tss/common';
import { IRootState } from '../../store/rootReducer';

const DashboardContainer = (): JSX.Element => {
	const { activityLogs } = useSelector(
		(globalState: IRootState) => globalState,
		shallowEqual,
	);
	const { _id, roles, currentRole } = useSelector(
		(globalState: IRootState) => globalState.user.userDetails,
		shallowEqual,
	);
	const [state, setState] = useState<DashboardContainerState>({
		isOpen: false,
		isLoading: true,
		isFeedbackMenuOpen: false,
		isFeedbackModal: false,
		isProfileMenuOpen: false,
		device: '',
		action: '',
		fields: {},
		feedback: '',
		anchorEl: null,
		roleSelected: '',
		roleId: '',
	});

	const classes = useDashboardContainerStyles();
	const history = useHistory();

	const { activeDevice, devices, isAdmin } = useContext(UserContext);
	const {
		selectedIndex,
		toggleRoleChangeDialog,
		handleCloseDeviceModal,
		handleSelectDeviceModal,
		isSelectDeviceModalOpen,
		isChangeRoleDialogOpen,
		toggleActivityDrawer,
		isActivityDrawerOpen,
	} = useContext(ComponentContext);

	const options: IClientSubscribeOptions = {
		qos: 2,
		rap: true,
	};

	const dispatch = useDispatch();
	// :TODO: Reformat to get user specific device subscription
	const userSensorSubscription = 'almond/data';
	const { message } = useSubscription(userSensorSubscription, options);

	useEffect(() => {
		if (message) {
			const parsedMessage = JSON.parse(message.message);
			const data = {
				temperature: parsedMessage?.temp,
				humidity: parsedMessage?.humid,
				waterLevel: parsedMessage?.water_level,
			};
			dispatch(getSensorData(data));
		}
	}, [message]);

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			activeDevice,
			device: activeDevice.id,
			roleSelected: currentRole.title,
		}));
	}, []);

	// const toggleRoleChangeDialog = () => {
	// 	setState((prevState) => ({
	// 		...prevState,
	// 		isChangeRoleDialogOpen: !prevState.isChangeRoleDialogOpen,
	// 		anchorEl: null,
	// 	}));
	// };

	const closeRoleChangeDialog = () => {
		toggleRoleChangeDialog();
		setState((prevState) => ({ ...prevState, roleSelected: '' }));
	};

	const handleSelectDevice = async () => {
		const deviceId = devices.filter((device) => device.id === state.device);
		await dispatch(activateDevice(deviceId[0]._id));
		// dispatch(getUserDetails());
		handleSelectDeviceModal();
		window.location.reload();
	};

	const handleDeviceInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { value } = event.target;
		setState((prevState) => ({ ...prevState, device: value }));
	};

	const handleRoleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const roleTitle = event.target.value;
		const role = roles.filter((obj) => obj.title === roleTitle);
		setState((prevState) => ({
			...prevState,
			roleId: role[0]._id,
			roleSelected: roleTitle,
		}));
	};

	const handleChangeRole = async (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { roleId } = state;
		await dispatch(editUserDetails(_id, { role: roleId }));
		closeRoleChangeDialog();
		window.localStorage.removeItem('selectedIndex');
		// window.location.reload();
	};

	const renderSelectDeviceContent = () => (
		<TextField
			id="device"
			select
			variant="outlined"
			label="device"
			fullWidth
			size="small"
			value={state.device}
			onChange={handleDeviceInputChange}
			SelectProps={{
				classes: {
					selectMenu: classes.selectHeight,
				},
			}}
			InputLabelProps={{
				classes: {
					focused: classes.focused,
				},
			}}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<AllOutTwoTone style={{ color: primaryColor }} />
					</InputAdornment>
				),
			}}
		>
			{devices.map((device) => (
				<MenuItem key={device.id} value={device.id}>
					<Typography variant="body1">{device.id}</Typography>
				</MenuItem>
			))}
		</TextField>
	);

	const renderSelectChangeRoleContent = () => (
		<TextField
			id="user-role"
			select
			variant="outlined"
			label="role"
			fullWidth
			size="small"
			value={state.roleSelected}
			onChange={handleRoleInputChange}
			SelectProps={{
				classes: {
					selectMenu: classes.selectHeight,
				},
			}}
			InputLabelProps={{
				classes: {
					focused: classes.focused,
				},
			}}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<Face style={{ color: primaryColor }} />
					</InputAdornment>
				),
			}}
		>
			{roles.map((role) => (
				<MenuItem key={role._id} value={role.title}>
					<Typography variant="body1">{role.title}</Typography>
				</MenuItem>
			))}
		</TextField>
	);

	const renderSelectDeviceModal = (): JSX.Element => (
		<Modal
			isModalOpen={isSelectDeviceModalOpen}
			renderHeader="Select the device ID"
			renderContent={renderSelectDeviceContent()}
			onClose={handleSelectDeviceModal}
			submitButtonName="Select Device"
			onSubmit={handleSelectDevice}
			onDismiss={handleCloseDeviceModal}
		/>
	);

	const renderChangeUserRoleDialog = (): JSX.Element => (
		<Modal
			isModalOpen={isChangeRoleDialogOpen}
			renderHeader="Confirm change of role"
			renderContent={renderSelectChangeRoleContent()}
			onClose={toggleRoleChangeDialog}
			submitButtonName="Select Role"
			onSubmit={handleChangeRole}
			onDismiss={toggleRoleChangeDialog}
		/>
	);

	const handleActivityDrawer = (status: 'open' | 'close') => () => {
		switch (status) {
			case 'open':
				toggleActivityDrawer(true, true);
				break;
			case 'close':
				toggleActivityDrawer(false, true);
				break;
			default:
				toggleActivityDrawer(false, true);
		}
	};

	/*
	 * Check if it is running on web browser in iOS
	 */
	const iOS =
		typeof window === 'undefined' &&
		/iPad|iPhone|iPod/.test(navigator.userAgent);

	const renderActivityDrawer = () => (
		<SwipeableDrawer
			anchor="right"
			open={isActivityDrawerOpen}
			onClose={handleActivityDrawer('close')}
			onOpen={handleActivityDrawer('open')}
			disableBackdropTransition={!iOS}
			disableDiscovery={iOS}
			style={{
				paddingLeft: 16,
				paddingRight: 16,
				marginLeft: 16,
				marginRight: 16,
			}}
		>
			<Typography
				variant="h5"
				gutterBottom
				style={{ marginTop: 20, paddingLeft: 16, paddingRight: 16 }}
			>
				Recent Activities
			</Typography>
			{isArrayNotNull(activityLogs) ? (
				activityLogs.map((logs) => (
					<div key={logs._id} style={{ paddingLeft: 12, paddingRight: 12 }}>
						<ActivityLogCard
							log={logs.actionDesc}
							date={logs.createdAt}
							type="info"
						/>
					</div>
				))
			) : (
				<div style={{ paddingLeft: 12, paddingRight: 12 }}>
					<BlankContent message="No Logs Found!" />
				</div>
			)}
		</SwipeableDrawer>
	);

	const checkIsAdmin = () => (isAdmin ? AdminMenus : UserMenus);

	return (
		<div data-testid="dashboard">
			<Grid container>
				<Grid item xs={12} md={12}>
					<TabPanel index={selectedIndex} value={selectedIndex}>
						{createElement(checkIsAdmin()[selectedIndex].component, {
							history,
						})}
					</TabPanel>
					{renderSelectDeviceModal()}
					{renderChangeUserRoleDialog()}
					{renderActivityDrawer()}
				</Grid>
			</Grid>
		</div>
	);
};

export default DashboardContainer;
