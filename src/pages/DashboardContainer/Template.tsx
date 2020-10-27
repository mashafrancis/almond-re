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
	SwipeableDrawer,
	MenuItem,
	TextField,
	InputAdornment,
} from '@material-ui/core';
import { Grid } from '@material/react-layout-grid';
import { useSubscription } from '@hooks/mqtt';
import { getSensorData } from '@modules/sensorData';
import { useDispatch } from 'react-redux';
// icons
import { AllOutTwoTone, Face } from '@material-ui/icons';
// components;
import { AdminMenus, UserMenus } from '@components/MenuRoutes';
import LinearProgressBar from '@components/LinearProgressBar';
import TopBar from '@components/TopBar';
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
import { primaryColor } from '../../assets/tss/common';
import { DashboardContainerProps, DashboardContainerState } from './interfaces';
import useViewport from '../../hooks/useViewport';
import './DashboardContainer.scss';
// lazy loaded components
const Modal = lazy(() => import('@components/Modal'));
const MenuContent = lazy(() => import('@components/MenuContent'));
const PageBottomNavigation = lazy(() => import('@components/BottomNavigation'));
const ActivityLogCard = lazy(() => import('@components/ActivityLogCard'));

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
		isChangeRoleDialogOpen: false,
		anchorEl: null,
		roleSelected: '',
		roleId: '',
	});

	const styles = useDashboardContainerStyles();

	const { activeDevice, devices, isAdmin } = useContext(UserContext);

	const {
		selectedIndex,
		setSelectedIndex,
		handleCloseDeviceModal,
		handleSelectDeviceModal,
		isSelectDeviceModalOpen,
		toggleActivityDrawer,
		isActivityDrawerOpen,
	} = useContext(ComponentContext);

	const { width } = useViewport();
	const breakpoint = 539;

	const modalRef = createRef();

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

	useEffect(() => {
		const selectedMenuIndex = JSON.parse(
			window.localStorage.getItem('selectedIndex') as string,
		);
		if (selectedMenuIndex) setSelectedIndex(selectedIndex);
		const initialSelectedIndex = { group: 0, item: 0 };
		window.localStorage.setItem(
			'selectedIndex',
			JSON.stringify(initialSelectedIndex),
		);
	}, []);

	const toggleRoleChangeDialog = () => {
		setState((prevState) => ({
			...prevState,
			isChangeRoleDialogOpen: !prevState.isChangeRoleDialogOpen,
			anchorEl: null,
		}));
	};

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

	const selectDeviceContent = (UserDevices: Device[]) => (
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
			{UserDevices.map((device: Device) => (
				<MenuItem key={device.id} value={device.id}>
					<h4 className="headline-5">{device.id}</h4>
				</MenuItem>
			))}
		</TextField>
	);

	const selectChangeRoleContent = () => (
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
					<h4 className="headline-5">{role.title}</h4>
				</MenuItem>
			))}
		</TextField>
	);

	const SelectDeviceModal = (device) => (
		<Modal
			ref={modalRef}
			isModalOpen={isSelectDeviceModalOpen}
			renderHeader={() => 'Select the device ID'}
			renderContent={() => selectDeviceContent(device)}
			onClose={handleSelectDeviceModal}
			submitButtonName="Select Device"
			onSubmit={handleSelectDevice}
			onDismiss={handleCloseDeviceModal}
		/>
	);

	const ChangeUserRoleDialog = (): JSX.Element => (
		<Modal
			ref={modalRef}
			isModalOpen={state.isChangeRoleDialogOpen}
			renderHeader={() => 'Confirm change of role'}
			renderContent={() => selectChangeRoleContent()}
			onClose={toggleRoleChangeDialog}
			submitButtonName="Select Role"
			onSubmit={handleChangeRole}
			onDismiss={toggleRoleChangeDialog}
		/>
	);

	const ActivityLogsList = (): JSX.Element => (
		<div className="activity-logs-drawer">
			<h5 className="card-header__title">Recent Activities</h5>
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
				<div className="blank-content">
					<h2>No logs found!</h2>
				</div>
			)}
		</div>
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
			{ActivityLogsList()}
		</SwipeableDrawer>
	);
	const checkIsAdmin = () => (isAdmin ? AdminMenus : UserMenus);

	return (
		<div className="dashboard" data-testid="dashboard">
			{width > breakpoint && <MenuContent />}
			<TopBar
				isActivityLogsEmpty={!isArrayNotNull(activityLogs)}
				toggleRoleChangeDialog={toggleRoleChangeDialog}
			>
				<Suspense fallback={<LinearProgressBar />}>
					<Grid>
						<TabPanel index={selectedIndex} value={selectedIndex}>
							{createElement(checkIsAdmin()[selectedIndex].component, {
								history,
							})}
						</TabPanel>
					</Grid>
				</Suspense>
			</TopBar>
			{width < breakpoint && <PageBottomNavigation />}
			{SelectDeviceModal(devices)}
			{ChangeUserRoleDialog()}
			{ActivityDrawer()}
		</div>
	);
};

export default DashboardTemplate;
