import { useContext, cloneElement } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import { Theme, useTheme } from '@material-ui/core/styles';
import {
	Toolbar,
	List,
	ListItem,
	Typography,
	Button,
	Grid,
	Badge,
	CssBaseline,
	AppBar,
	useScrollTrigger,
	Divider,
	useMediaQuery,
	SwipeableDrawer,
	Stack,
} from '@material-ui/core';
import { ActivityLogCard, DarkModeToggler } from '@components/atoms';
import { UserContext } from '@context/UserContext';
import {
	ArrowDropDownTwoTone,
	ArrowDropUpTwoTone,
	Notifications,
	NotificationsNone,
	Timeline,
} from '@material-ui/icons';
import { ComponentContext } from '@context/ComponentContext';
import { useMqttState } from '@hooks/mqtt';
import { CustomAvatar, NotificationsPanel } from '@components/molecules';
import Logo from '@components/atoms/Logo';
import { shallowEqual, useSelector } from 'react-redux';
import { BlankContent } from '@pages/WaterCyclesPage';
import {
	closedColor,
	connectedColor,
	offlineColor,
	reconnectingColor,
} from '../../../../assets/tss/common';
import { ElevationBarProps } from './interfaces';
import { IRootState } from '../../../../store/rootReducer';
import { notificationsUnread } from './fixtures';
import { useStyles } from './styles';

const ElevationScroll = ({
	window,
	children,
}: ElevationBarProps): JSX.Element => {
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
};

interface Props {
	className?: string;
	onSidebarOpen?: () => void;
	themeMode: string;
	themeToggler: () => void;
	isActivityLogsEmpty: any;
}

const Topbar = ({
	themeMode,
	themeToggler,
	onSidebarOpen,
	className,
	isActivityLogsEmpty,
	...rest
}: Props): JSX.Element => {
	const classes = useStyles();
	const themePoint = useTheme();

	const isSm = useMediaQuery(themePoint.breakpoints.up('sm'), {
		defaultMatches: true,
	});

	const {
		activityLogsViewed,
		toggleActivityDrawer,
		setDeviceModalOpen,
		isSelectDeviceModalOpen,
	} = useContext(ComponentContext);

	const { roles } = useSelector(
		(globalState: IRootState) => globalState.user.userDetails,
		shallowEqual,
	);

	/*
	 * Status list
	 * - Offline
	 * - Connected
	 * - Reconnecting
	 * - Closed
	 * - Error
	 */
	const { connectionStatus } = useMqttState();

	const { activeDevice, isAdmin } = useContext(UserContext);

	const statusChange = (mqttStatus: string): string => {
		switch (mqttStatus) {
			case 'Connected':
				return connectedColor;
			case 'Reconnecting':
				return reconnectingColor;
			case 'Closed':
				return closedColor;
			case 'Offline':
				return offlineColor;
			default:
				return reconnectingColor;
		}
	};

	const DeviceActiveBadge = withStyles((theme: Theme) =>
		createStyles({
			badge: {
				backgroundColor: statusChange(connectionStatus as string),
				color: statusChange(connectionStatus as string),
				boxShadow: `0 0 0 1px ${
					isSm ? theme.palette.background.paper : 'rgba(38,38,38,0.32)'
				}`,
				top: '50%',
				left: '-12%',
				'&::after': {
					position: 'absolute',
					width: '100%',
					height: '100%',
					borderRadius: '50%',
					// animation: '$ripple 1.2s infinite ease-in-out',
					border: '0.8px solid currentColor',
					content: '""',
				},
			},
		}),
	)(Badge);

	const renderMoreButton = (handleClick) =>
		isSelectDeviceModalOpen ? (
			<ArrowDropUpTwoTone
				style={{
					color: `${isSm ? '#fff' : 'rgba(17, 17, 17, 0.8)'}`,
				}}
			/>
		) : (
			<ArrowDropDownTwoTone
				onClick={handleClick}
				style={{
					color: `${isSm ? '#fff' : 'rgba(17, 17, 17, 0.8)'}`,
				}}
			/>
		);

	const renderDeviceDisplay = (): JSX.Element => {
		const handleClick = (): void => setDeviceModalOpen(true);
		const handleDeviceModal = (): void => setDeviceModalOpen(true);
		return (
			<Button
				variant={isSm ? 'contained' : 'outlined'}
				size="small"
				onClick={handleClick}
				onKeyDown={handleDeviceModal}
				style={{
					paddingLeft: 36,
					marginLeft: `${isSm ? '19' : '15'}%`,
					backgroundColor: `${isSm ? 'rgba(17, 17, 17, 0.8)' : '#fff'}`,
				}}
			>
				<Grid
					container
					direction="row"
					justifyContent="space-evenly"
					alignItems="center"
					spacing={2}
					style={{ margin: 0, padding: 0 }}
				>
					<DeviceActiveBadge
						variant="dot"
						overlap="circular"
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
					>
						<Grid
							container
							direction="row"
							justifyContent="space-evenly"
							alignItems="center"
							spacing={2}
							style={{ margin: 0, padding: 0 }}
						>
							<Typography
								variant="subtitle2"
								className={clsx(classes.listItemText, classes.deviceText)}
								style={{ fontWeight: 400 }}
							>
								Device ID:
							</Typography>
							<Typography
								variant="subtitle2"
								className={clsx(classes.listItemText, classes.deviceText)}
								style={{
									paddingLeft: 6,
									fontWeight: 500,
								}}
							>
								{activeDevice?.id}
							</Typography>
							{renderMoreButton(handleClick)}
						</Grid>
					</DeviceActiveBadge>
				</Grid>
			</Button>
		);
	};

	const renderTimeLineIcon = (): JSX.Element => {
		const handleClick = () => toggleActivityDrawer(true, true);
		return (
			<Badge
				overlap="circular"
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				variant="dot"
				// invisible={isActivityLogsEmpty !== activityLogsViewed}
			>
				<Timeline color="primary" onClick={handleClick} />
			</Badge>
		);
	};

	return (
		<>
			<CssBaseline />
			<ElevationScroll {...rest}>
				<AppBar
					className={classes.appBar}
					position="fixed"
					elevation={0}
					data-testid="top-bar"
				>
					<Toolbar
						disableGutters
						className={classes.toolbar}
						{...rest}
						variant="dense"
					>
						<div className={classes.leftContainer}>
							<Logo themeMode={themeMode} />
							{!isAdmin && renderDeviceDisplay()}
						</div>
						<div className={classes.flexGrow} />
						{isSm && (
							<List disablePadding className={classes.navigationContainer}>
								<ListItem className="menu-item--no-dropdown">
									<DarkModeToggler
										themeMode={themeMode}
										onChange={() => themeToggler()}
										size={24}
									/>
								</ListItem>
								{!isAdmin && (
									<ListItem
										className={clsx(
											classes.listItem,
											'menu-item--no-dropdown',
										)}
									>
										{renderTimeLineIcon()}
									</ListItem>
								)}
								<ListItem
									className={clsx(classes.listItem, 'menu-item--no-dropdown')}
								>
									<NotificationsPanel />
								</ListItem>
								<ListItem className={clsx(classes.listItem)}>
									<CustomAvatar hasMultipleRoles={roles.length > 1} />
								</ListItem>
							</List>
						)}
						{isSm ? null : (
							<CustomAvatar hasMultipleRoles={roles.length > 1} />
						)}
					</Toolbar>
					{/* <Divider /> */}
				</AppBar>
			</ElevationScroll>
		</>
	);
};

export default Topbar;
