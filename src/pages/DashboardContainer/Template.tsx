import {
	useState,
	useEffect,
	useContext,
	useRef,
	ChangeEvent,
	MouseEvent,
	KeyboardEvent,
	Suspense,
	createElement,
	lazy,
	createRef,
} from 'react';
// third-party libraries
import {
	AppBar,
	Grid,
	Hidden,
	InputAdornment,
	MenuItem,
	SwipeableDrawer,
	TextField,
} from '@material-ui/core';
import { useSubscription } from '@hooks/mqtt';
import { getSensorData } from '@modules/sensorData';
import { useDispatch } from 'react-redux';
// icons
import { AllOutTwoTone, Face } from '@material-ui/icons';
// components;
import { AdminMenus, UserMenus } from '@components/MenuRoutes';
import TabPanel from '@components/TabPanel';
// utils
import { UserContext } from '@context/UserContext';
import { ComponentContext } from '@context/ComponentContext';
import isArrayNotNull from '@utils/checkArrayEmpty';
// interfaces
import { Device } from '@modules/device/interfaces';
import { IClientSubscribeOptions } from 'mqtt';
// styles
import { useDashboardContainerStyles } from '@pages/DashboardContainer/styles';
import Modal from '@components/Modal';
import ActivityLogCard from '@components/ActivityLogCard';
import Typography from '@material-ui/core/Typography';
import { BlankContent } from '@pages/WaterCyclesPage/Template';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useViewport from '../../hooks/useViewport';
import { DashboardContainerProps, DashboardContainerState } from './interfaces';
import { primaryColor } from '../../assets/tss/common';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			// paddingLeft: 10,
			// paddingRight: 10,
			// height: '46px',
		},
		appBar: {
			// top: 'auto',
			top: 0,
			backgroundColor: theme.palette.background.level1,
			zIndex: theme.zIndex.drawer + 1,
		},
	}),
);

const DashboardTemplate = ({
	history,
	activityLogs,
	user,
	getUserDetails,
	editUserDetails,
	activateDevice,
}: DashboardContainerProps): JSX.Element => {
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

	const styles = useDashboardContainerStyles();
	const classes = useStyles();

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
	const { lastMessage, mqtt } = useSubscription(
		userSensorSubscription,
		options,
	);

	useEffect(() => {
		const data = {
			temperature: lastMessage?.message?.temp,
			humidity: lastMessage?.message?.humid,
			waterLevel: lastMessage?.message?.water_level,
		};
		dispatch(getSensorData(data));
	}, [lastMessage]);

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			activeDevice,
			device: activeDevice.id,
			roleSelected: user.currentRole.title,
		}));
	}, []);

	// useEffect(() => {
	// 	const selectedMenuIndex = JSON.parse(
	// 		window.localStorage.getItem('selectedIndex') as string,
	// 	);
	// 	if (selectedMenuIndex) setSelectedIndex(selectedIndex);
	// 	const initialSelectedIndex = 0;
	// 	window.localStorage.setItem(
	// 		'selectedIndex',
	// 		JSON.stringify(initialSelectedIndex),
	// 	);
	// }, []);

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

	const handleSelectDevice = () => {
		const deviceId = devices.filter((device) => device.id === state.device);
		activateDevice({ id: deviceId[0]._id }).then(async () => getUserDetails());
		handleSelectDeviceModal();
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setState((prevState) => ({ ...prevState, device: event.target.value }));
	};

	const handleRoleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const roleTitle = event.target.value;
		const role = user.roles.filter((obj) => obj.title === roleTitle);
		setState((prevState) => ({
			...prevState,
			roleId: role[0]._id,
			roleSelected: roleTitle,
		}));
	};

	const handleChangeRole = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { roleId } = state;
		editUserDetails(user._id, { role: roleId })
			.then(closeRoleChangeDialog)
			.then(() => {
				window.localStorage.removeItem('selectedIndex');
				window.location.reload();
			});
	};

	const SelectDeviceContent = ({ devices }) => (
		<TextField
			id="device"
			select
			variant="outlined"
			label="device"
			fullWidth
			size="small"
			value={state.device}
			onChange={handleInputChange}
			SelectProps={{
				classes: {
					selectMenu: styles.selectHeight,
				},
			}}
			InputLabelProps={{
				classes: {
					focused: styles.focused,
					root: styles.labelColor,
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
			{devices.map((device: Device) => (
				<MenuItem key={device.id} value={device.id}>
					<Typography variant="body1">{device.id}</Typography>
				</MenuItem>
			))}
		</TextField>
	);

	const SelectChangeRoleContent = () => (
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
					selectMenu: styles.selectHeight,
				},
			}}
			InputLabelProps={{
				classes: {
					focused: styles.focused,
					root: styles.labelColor,
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
			{user.roles.map((role) => (
				<MenuItem key={role._id} value={role.title}>
					<Typography variant="body1">{role.title}</Typography>
				</MenuItem>
			))}
		</TextField>
	);

	const SelectDeviceModal = ({ devices }): JSX.Element => (
		<Modal
			isModalOpen={isSelectDeviceModalOpen}
			renderHeader={() => 'Select the device ID'}
			renderContent={<SelectDeviceContent devices={devices} />}
			onClose={handleSelectDeviceModal}
			submitButtonName="Select Device"
			onSubmit={handleSelectDevice}
			onDismiss={handleCloseDeviceModal}
		/>
	);

	const ChangeUserRoleDialog = (): JSX.Element => (
		<Modal
			isModalOpen={isChangeRoleDialogOpen}
			renderHeader={() => 'Confirm change of role'}
			renderContent={<SelectChangeRoleContent />}
			onClose={toggleRoleChangeDialog}
			submitButtonName="Select Role"
			onSubmit={handleChangeRole}
			onDismiss={toggleRoleChangeDialog}
		/>
	);

	const ActivityLogsList = (): JSX.Element => (
		<>
			<Typography
				variant="h5"
				gutterBottom
				style={{ marginTop: 20, marginLeft: 10 }}
			>
				Recent Activities
			</Typography>
			{isArrayNotNull(activityLogs) ? (
				activityLogs.map((logs) => (
					<ActivityLogCard
						key={logs._id}
						log={logs.actionDesc}
						date={logs.createdAt}
						type="info"
					/>
				))
			) : (
				<BlankContent message="No Logs Found!" />
			)}
		</>
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

	const ActivityDrawer = () => (
		<SwipeableDrawer
			anchor="right"
			open={isActivityDrawerOpen}
			onClose={handleActivityDrawer('close')}
			onOpen={handleActivityDrawer('open')}
			disableBackdropTransition={!iOS}
			disableDiscovery={iOS}
		>
			<ActivityLogsList />
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
					<SelectDeviceModal devices={devices} />
					<ChangeUserRoleDialog />
					<ActivityDrawer />
				</Grid>
			</Grid>
		</div>
	);
};

export default DashboardTemplate;
