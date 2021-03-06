import {
	useState,
	useEffect,
	useContext,
	ChangeEvent,
	createElement,
} from 'react';
// third-party libraries
import {
	Divider,
	Grid,
	InputAdornment,
	LinearProgress,
	MenuItem,
	Stack,
	SwipeableDrawer,
	TextField,
} from '@material-ui/core';
import { useSubscription } from '@hooks/mqtt';
import {
	getSensorDataFromInflux,
	getSensorDataFromMqtt,
} from '@modules/sensorData';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// icons
import {
	AllOutTwoTone,
	Face,
	Notifications,
	Timeline,
} from '@material-ui/icons';
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
import { SectionAlternate } from '@components/organisms';
import Typography from '@material-ui/core/Typography';
import { BlankContent } from '@pages/WaterCyclesPage';
import { useHistory } from 'react-router-dom';
import { editUserDetails, editUserRole } from '@modules/user';
import { activateDevice } from '@modules/device';
import { DashboardContainerState } from './interfaces';
import { primaryColor } from '../../assets/tss/common';
import { IRootState } from '../../store/rootReducer';

const DashboardContainer = (): JSX.Element => {
	const { activityLogs } = useSelector(
		(globalState: IRootState) => globalState,
		shallowEqual,
	);
	const {
		userDetails: { _id, currentRole, roles },
		isLoading,
	} = useSelector((globalState: IRootState) => globalState.user);
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
		setSelectedIndex,
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

	// const TIME_MS = 10_000;
	//
	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		dispatch(getSensorDataFromInflux());
	// 	}, TIME_MS);
	//
	// 	return () => clearInterval(interval);
	// }, []);

	// :TODO: Reformat to get user specific device subscription
	const userSensorSubscription = 'almond/data';
	const { message } = useSubscription(userSensorSubscription, options);

	// useEffect(() => {
	// 	if (message) {
	// 		const parsedMessage = JSON.parse(message.message);
	// 		const data = {
	// 			temperature: parsedMessage?.temp,
	// 			humidity: parsedMessage?.humid,
	// 			waterLevel: parsedMessage?.water_level,
	// 		};
	// 		dispatch(getSensorDataFromMqtt(data));
	// 	}
	// }, [message]);

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			activeDevice,
			device: activeDevice.id,
		}));
	}, []);

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			roleSelected: currentRole?.title,
		}));
	}, [currentRole]);

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
		toggleRoleChangeDialog();
		if (roleId) {
			await dispatch(editUserRole(_id, { role: roleId }));
		}
		// window.localStorage.removeItem('selectedIndex');
		setSelectedIndex(0);
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
					select: classes.selectHeight,
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
					select: classes.selectHeight,
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
			renderDialogText="Select the device you want to use."
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
			renderDialogText="Select the role you want to perform."
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
			<div style={{ margin: 10 }}>
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					spacing={1}
					className={classes.swipeableHeading}
				>
					<Typography
						variant="body1"
						gutterBottom={false}
						sx={{ paddingLeft: 3, paddingRight: 3, fontWeight: 500 }}
					>
						Recent Activities
					</Typography>
					<Timeline color="primary" />
				</Stack>
				<Divider sx={{ marginTop: 2 }} />
			</div>
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
				<Stack
					direction="column"
					justifyContent="center"
					alignItems="center"
					spacing={3}
				>
					<p aria-hidden="true" className={classes.blankState}>
						¯\_(ツ)_/¯{' '}
					</p>
					<BlankContent message="No logs found!" />
				</Stack>
			)}
		</SwipeableDrawer>
	);

	const checkIsAdmin = () => (isAdmin ? AdminMenus : UserMenus);

	return (
		<div data-testid="dashboard" className={classes.root}>
			<SectionAlternate className={classes.section}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={12}>
						<TabPanel index={selectedIndex} value={selectedIndex}>
							{isLoading ? (
								<LinearProgress color="primary" />
							) : (
								createElement(checkIsAdmin()[selectedIndex].component, {
									history,
								})
							)}
						</TabPanel>
						{renderSelectDeviceModal()}
						{renderChangeUserRoleDialog()}
						{renderActivityDrawer()}
					</Grid>
				</Grid>
			</SectionAlternate>
		</div>
	);
};

export default DashboardContainer;
