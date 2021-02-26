import { useContext, useState, MouseEvent, cloneElement } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
	Toolbar,
	Hidden,
	List,
	ListItem,
	ListItemIcon,
	Popover,
	Typography,
	IconButton,
	Button,
	Avatar,
	Grid,
	Badge,
	CssBaseline,
	AppBar,
	useScrollTrigger,
	Menu,
	MenuItem,
	Drawer,
	Divider,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import { Image, DarkModeToggler } from '@components/atoms';
import authService from '@utils/auth';
import { UserContext } from '@context/UserContext';
import { NavLink } from 'react-router-dom';
import isArrayNotNull from '@utils/checkArrayEmpty';
import { SectionHeader } from '@components/molecules';
import MenuContent from '@components/MenuContent';
import {
	Add,
	ArrowDropDown,
	ExitToApp,
	Help,
	Mood,
	Notifications,
	NotificationsNone,
	OpenInNew,
	Settings,
	Timeline,
} from '@material-ui/icons';
import { ComponentContext } from '@context/ComponentContext';
import { useMqttState } from '@hooks/mqtt';
import withStyles from '@material-ui/core/styles/withStyles';
import fancyId from '@utils/fancyId';
import { logoutUser } from '@modules/user';
import { useDispatch } from 'react-redux';
import { StyledBadge } from './styles';
import {
	closedColor,
	connectedColor,
	offlineColor,
	reconnectingColor,
} from '../../../../assets/tss/common';
import { ElevationBarProps } from './interfaces';

const logo = 'https://static.almondhydroponics.com/static/logo.png';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	flexGrow: {
		flexGrow: 1,
	},
	flexGrowLeft: {
		flexGrow: 0,
	},
	navigationContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: 100,
	},
	toolbar: {
		zIndex: 999,
		maxWidth: '100%',
		width: '100%',
		margin: '0 auto',
		padding: theme.spacing(0, 2),
		[theme.breakpoints.up('sm')]: {
			padding: theme.spacing(0, 8),
		},
	},
	navLink: {
		'&:hover': {
			color: theme.palette.primary.main,
		},
	},
	listItem: {
		cursor: 'pointer',
		'&:hover > .menu-item, &:hover svg': {
			color: theme.palette.primary.main,
		},
		'&.menu-item--no-dropdown': {
			paddingRight: 0,
		},
	},
	listItemActive: {
		'&> .menu-item': {
			color: theme.palette.primary.main,
		},
	},
	listItemText: {
		flex: '0 0 auto',
		// marginLeft: theme.spacing(0),
		whiteSpace: 'nowrap',
	},
	listItemButton: {
		whiteSpace: 'nowrap',
	},
	listItemIcon: {
		minWidth: 'auto',
	},
	popover: {
		padding: theme.spacing(4),
		border: theme.spacing(2),
		boxShadow: '0 0.5rem 2rem 2px rgba(116, 123, 144, 0.09)',
		minWidth: 350,
		marginTop: theme.spacing(2),
	},
	iconButton: {
		marginLeft: theme.spacing(2),
		padding: 0,
		'&:hover': {
			background: 'transparent',
		},
	},
	expandOpen: {
		transform: 'rotate(180deg)',
		color: theme.palette.primary.dark,
	},
	logoContainer: {
		width: '10%',
		height: '10%',
		[theme.breakpoints.up('md')]: {
			width: '3%',
			height: '3%',
		},
	},
	container: {
		display: 'inline-flex',
		alignItems: 'center',
		flexFlow: 'row',
	},
	logoImage: {
		width: '100%',
		height: '100%',
		// [theme.breakpoints.up('md')]: {
		// 	width: '60%',
		// 	height: '60%',
		// },
	},
	menu: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	menuItem: {
		marginRight: theme.spacing(5),
		'&:last-child': {
			marginRight: 0,
		},
	},
	menuGroupItem: {
		paddingTop: 0,
	},
	menuGroupTitle: {
		textTransform: 'uppercase',
	},
	avatar: {
		// borderRadius: '50%',
		// padding: 0;
		width: '40px',
		height: '40px',
		cursor: 'pointer',
		margin: '4px',
	},
	grow: {
		flexGrow: 1,
	},
	device: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		marginRight: theme.spacing(4),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(5),
			width: 'auto',
		},
	},
	deviceText: {
		color: '#fff',
		[theme.breakpoints.up('sm')]: {
			fontWeight: 500,
		},
	},
	topDevice: {
		position: 'relative',
		display: 'flex',
		maxWidth: 'fit-content',
		padding: '4px 40px',
		marginLeft: theme.spacing(12),
		marginRight: theme.spacing(4),
		// marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			// marginLeft: theme.spacing(5),
			width: 'auto',
		},
		color: '#fff',
		backgroundColor: 'rgba(17, 17, 17, 0.8)',
		border: '1px solid #dadce0',
		borderRadius: theme.shape.borderRadius,
	},
	appBar: {
		backgroundColor: theme.palette.background.default,
		zIndex: theme.zIndex.drawer + 1,
	},
	leftContainer: {
		display: 'inline-flex',
		minWidth: 0,
		flex: '1 1 auto',
		alignItems: 'center',
		justifyContent: 'flex-start',
		order: -1,
		// [theme.breakpoints.up('sm')]: {
		//   padding: '4px'
		// },
	},
	sectionEnd: {
		display: 'inline-flex',
		// [theme.breakpoints.up('md')]: {
		//   display: 'inline-flex',
		// },
		justifyContent: 'flex-end',
		order: 1,
		// color: 'black'
	},
	menuPopup: {
		right: 16,
		left: 'unset !important',
	},
}));

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
	onSidebarOpen?: Function;
	themeMode: string;
	themeToggler: Function;
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
	const dispatch = useDispatch();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openedPopoverId, setOpenedPopoverId] = useState<string | null>(null);
	const {
		activityLogsViewed,
		toggleActivityDrawer,
		setDeviceModalOpen,
		setSelectedIndex,
		toggleRoleChangeDialog,
	} = useContext(ComponentContext);
	const { name, photo, isAdmin, activeDevice } = useContext(UserContext);
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

	const handleToggleProfileMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleProfileClose = () => setAnchorEl(null);

	const logoutActiveUser = (): void => {
		window.location.replace('/');
		dispatch(logoutUser());
	};

	const DeviceActiveBadge = withStyles((theme: Theme) =>
		createStyles({
			badge: {
				backgroundColor: statusChange(status),
				color: statusChange(status),
				boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
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

	const DeviceDisplay = (): JSX.Element => {
		const handleClick = (): void => setDeviceModalOpen(true);
		const handleDeviceModal = (): void => setDeviceModalOpen(true);
		return (
			<Button
				variant="contained"
				size="small"
				onClick={handleClick}
				onKeyDown={handleDeviceModal}
				style={{
					paddingLeft: 36,
					marginLeft: '15%',
					backgroundColor: 'rgba(17, 17, 17, 0.8)',
				}}
			>
				<Grid
					container
					direction="row"
					justify="space-evenly"
					alignItems="center"
					spacing={2}
					style={{ margin: 0, padding: 0 }}
				>
					<DeviceActiveBadge
						variant="dot"
						overlap="circle"
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
					>
						<Grid
							container
							direction="row"
							justify="space-evenly"
							alignItems="center"
							spacing={2}
							style={{ margin: 0, padding: 0 }}
						>
							<Typography
								variant="body2"
								className={clsx(classes.listItemText, classes.deviceText)}
								style={{ margin: 0, padding: 0 }}
							>
								{`Device ID: ${activeDevice?.id}`}
							</Typography>
							<ArrowDropDown onClick={handleClick} style={{ color: '#fff' }} />
						</Grid>
					</DeviceActiveBadge>
				</Grid>
			</Button>
		);
	};

	const TimeLineIcon = (): JSX.Element => {
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
				<Timeline color="primary" onClick={handleClick} />
			</StyledBadge>
		);
	};

	// :TODO: Remove this after demoing the feature to be
	const notifications = ['true'];

	const NotificationsIcon = (): JSX.Element =>
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
				<Notifications color="primary" />
			</StyledBadge>
		);

	const menuItems = [
		{ name: 'Settings', icon: <Settings /> },
		{ name: 'Help', icon: <Help /> },
		{ name: 'Send Feedback', icon: <OpenInNew /> },
	];

	const handleRoleModal = () => {
		handleProfileClose();
		toggleRoleChangeDialog();
	};

	const AvatarImage = (): JSX.Element => {
		const open = Boolean(anchorEl);
		const id = open ? 'menu-popover' : undefined;
		return (
			<>
				<Avatar
					className={classes.avatar}
					alt={name}
					src={photo}
					onClick={handleToggleProfileMenu}
					aria-describedby="menu-popover"
					aria-controls="menu-popover"
					aria-haspopup="true"
					typeof="button"
				/>
				<Menu
					id="menu-popover"
					classes={{
						paper: classes.menuPopup,
					}}
					style={{ top: '44px', right: '16px' }}
					anchorEl={anchorEl}
					open={open}
					keepMounted
					onClose={handleProfileClose}
				>
					{menuItems.map((item, index) => {
						const handleClick = () => {
							handleProfileClose();
							setSelectedIndex(index);
						};
						return (
							<MenuItem key={fancyId()} onClick={handleClick}>
								<ListItemIcon style={{ minWidth: 40 }}>
									{item.icon}
								</ListItemIcon>
								{item.name}
							</MenuItem>
						);
					})}
					<MenuItem onClick={handleRoleModal}>
						<ListItemIcon style={{ minWidth: 40 }}>
							<Mood />
						</ListItemIcon>
						Change role
					</MenuItem>
					<MenuItem onClick={logoutActiveUser}>
						<ListItemIcon style={{ minWidth: 40 }}>
							<ExitToApp />
						</ListItemIcon>
						Logout
					</MenuItem>
				</Menu>
			</>
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
							<div className={classes.logoContainer}>
								<NavLink to="/">
									<Grid container className={classes.container}>
										<Image
											className={classes.logoImage}
											src={themeMode === 'light' ? logo : logo}
											alt="almond"
											lazy={false}
										/>
									</Grid>
								</NavLink>
							</div>
							<DeviceDisplay />
							{/* <Hidden smDown>{!isAdmin && <DeviceDisplay />}</Hidden> */}
						</div>
						<div className={classes.flexGrow} />
						<Hidden smDown>
							<List disablePadding className={classes.navigationContainer}>
								<ListItem className="menu-item--no-dropdown">
									<DarkModeToggler
										themeMode={themeMode}
										onChange={() => themeToggler()}
										size={24}
									/>
								</ListItem>
								<ListItem
									className={clsx(classes.listItem, 'menu-item--no-dropdown')}
								>
									<TimeLineIcon />
								</ListItem>
								<ListItem
									className={clsx(classes.listItem, 'menu-item--no-dropdown')}
								>
									<NotificationsIcon />
								</ListItem>
								<ListItem className={clsx(classes.listItem)}>
									<AvatarImage />
								</ListItem>
							</List>
						</Hidden>
						<Hidden mdUp>
							<DarkModeToggler
								themeMode={themeMode}
								onChange={() => themeToggler()}
								size={24}
							/>
						</Hidden>
					</Toolbar>
					<Divider />
				</AppBar>
			</ElevationScroll>
		</>
	);
};

export default Topbar;
