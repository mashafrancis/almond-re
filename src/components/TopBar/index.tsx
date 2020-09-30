import React, { cloneElement, useContext } from 'react';
import {
	Avatar,
	Badge,
	useScrollTrigger,
	CssBaseline,
	AppBar,
	Toolbar,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { NavLink } from 'react-router-dom';
import { createStyles, Theme } from '@material-ui/core/styles';
import { useMqttState } from 'mqtt-hooks';
// icons
import {
	Timeline,
	NotificationsNone,
	Notifications,
	ArrowDropDown,
} from '@material-ui/icons';
// utils
import { UserContext } from '@context/UserContext';
import { ComponentContext } from '@context/ComponentContext';
import isArrayNotNull from '@utils/checkArrayEmpty';
// styles
import { useTopBarStyles, StyledBadge } from '@components/TopBar/styles';
import '@pages/DashboardContainer/DashboardNavBar.scss';
// interface
import useStyles from '@components/MenuContent/styles';
import { ElevationBarProps, TopBarProps } from './interfaces';
import {
	closedColor,
	connectedColor,
	offlineColor,
	reconnectingColor,
} from '../../assets/tss/common';
// images
import logo from '../../assets/images/logo.png';

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

const TopBar = ({
	isActivityLogsEmpty,
	children,
	openProfileDialog,
}: TopBarProps): JSX.Element => {
	const classes = useTopBarStyles();
	const classesMenu = useStyles();
	const device = useContext(UserContext);
	const {
		activityLogsViewed,
		toggleActivityDrawer,
		setDeviceModalOpen,
	} = useContext(ComponentContext);
	const { name, photo, isAdmin } = useContext(UserContext);
	const { status } = useMqttState();

	const statusChange = (mqttStatus: string): string => {
		switch (mqttStatus) {
			case 'connected':
				return connectedColor;
			case 'reconnecting':
				return reconnectingColor;
			case 'closed':
				return closedColor;
			case 'offline':
				return offlineColor;
			default:
				return offlineColor;
		}
	};

	const DeviceActiveBadge = withStyles((theme: Theme) =>
		createStyles({
			badge: {
				backgroundColor: statusChange(status),
				color: statusChange(status),
				boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
				top: '50%',
				left: '-8%',
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

	const renderDeviceDisplay = (): JSX.Element => {
		const handleClick = (): void => setDeviceModalOpen(true);
		const handleDeviceModal = (): void => setDeviceModalOpen(true);
		return (
			<div
				className={`${classes.device} ${classes.grow} topbar-device-id`}
				onClick={handleDeviceModal}
				onKeyDown={handleDeviceModal}
				role="presentation"
			>
				<DeviceActiveBadge
					variant="dot"
					overlap="circle"
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
				>
					<h4>{`Device ID: ${device.activeDevice.id}`}</h4>
					<ArrowDropDown onClick={handleClick} />
				</DeviceActiveBadge>
			</div>
		);
	};

	const timeLineIcon = (): JSX.Element => {
		const handleClick = () => toggleActivityDrawer(true, true);
		return (
			<StyledBadge
				overlap="circle"
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				variant="dot"
				invisible={isActivityLogsEmpty !== activityLogsViewed}
			>
				<Timeline onClick={handleClick} />
			</StyledBadge>
		);
	};

	// :TODO: Remove this after demoing the feature to be
	const notifications = ['true'];

	const notificationsIcon = () =>
		isArrayNotNull(notifications.length) ? (
			<NotificationsNone />
		) : (
			<StyledBadge
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				overlap="circle"
				invisible={isArrayNotNull(notifications.length)}
				variant="dot"
			>
				<Notifications style={{ color: '#1967D2' }} />
			</StyledBadge>
		);

	const topIcons = [
		{ icon: timeLineIcon() },
		{ icon: notificationsIcon() },
		{
			icon: <Avatar alt={name} src={photo} onClick={openProfileDialog} />,
		},
	];

	const renderTopIcons = (): JSX.Element => (
		<div className={classes.sectionEnd}>
			{topIcons.map((topIcon, index) => (
				// eslint-disable-next-line react/no-array-index-key
				<span key={index} className="top-bar-icons">
					{topIcon.icon}
				</span>
			))}
		</div>
	);
	return (
		<>
			<CssBaseline />
			<ElevationScroll>
				<AppBar
					className={`${classesMenu.appBar} mdc-top-app-bar`}
					position="fixed"
					data-testid="top-bar"
				>
					<Toolbar variant="dense">
						<div className="appbar-section appbar-section-start">
							<NavLink to="/">
								<img className="drawer-logo__image" src={logo} alt="Logo" />
							</NavLink>
							{!isAdmin && renderDeviceDisplay()}
						</div>
						<div className="appbar-section appbar-section-end">
							{renderTopIcons()}
						</div>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className="mdc-top-app-bar--fixed-adjust">{children}</div>
		</>
	);
};

export default TopBar;
