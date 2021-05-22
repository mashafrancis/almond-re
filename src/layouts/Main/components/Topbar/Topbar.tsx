import { useContext, useState, MouseEvent } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import {
	Toolbar,
	List,
	ListItem,
	Typography,
	IconButton,
	Button,
	useMediaQuery,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { DarkModeToggler } from '@components/atoms';
import authService from '@utils/auth';
import { UserContext } from '@context/UserContext';
import { NavLink } from 'react-router-dom';
import isArrayNotNull from '@utils/checkArrayEmpty';
import { CustomAvatar } from '@components/molecules';
import Logo from '@components/atoms/Logo';
import { shallowEqual, useSelector } from 'react-redux';
import { PagesProps } from '../../../interfaces';
import { IRootState } from '../../../../store/rootReducer';

const useStyles = makeStyles((theme: Theme) => ({
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
		marginLeft: '100px',
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
		[theme.breakpoints.up('md')]: {
			width: '60%',
			height: '60%',
		},
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
}));

interface Props {
	className?: string;
	onSidebarOpen: () => void;
	pages: PagesProps;
	themeMode: string;
	themeToggler: () => void;
}

const Topbar = ({
	themeMode,
	themeToggler,
	onSidebarOpen,
	pages,
	className,
	...rest
}: Props): JSX.Element => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = useState<any>(null);
	const [openedPopoverId, setOpenedPopoverId] = useState<string | null>(null);
	const { devices } = useContext(UserContext);

	const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

	const handleClick = (
		event: MouseEvent<HTMLElement>,
		popoverId: string | null,
	): void => {
		setAnchorEl(event.target);
		setOpenedPopoverId(popoverId);
	};

	const renderAuthButtons = () => (
		<>
			{authService.isAuthenticated() ? (
				<ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
					<CustomAvatar />
				</ListItem>
			) : (
				<>
					<NavLink to="/login">
						<ListItem
							className={clsx(classes.listItem, 'menu-item--no-dropdown')}
						>
							<Button variant="outlined">Login</Button>
						</ListItem>
					</NavLink>

					<NavLink to="/register">
						<ListItem
							className={clsx(classes.listItem, 'menu-item--no-dropdown')}
						>
							<Button
								variant="contained"
								color="primary"
								className={classes.listItemButton}
							>
								Register
							</Button>
						</ListItem>
					</NavLink>
				</>
			)}
		</>
	);

	return (
		<Toolbar
			disableGutters
			className={classes.toolbar}
			{...rest}
			variant="dense"
		>
			<Logo themeMode={themeMode} displayText />
			{hidden && (
				<List disablePadding className={classes.navigationContainer}>
					<NavLink to="/plant-resources">
						<ListItem
							aria-describedby="resources"
							className={clsx(classes.listItem)}
						>
							<Typography
								variant="body1"
								color="textPrimary"
								className={clsx(classes.listItemText, 'menu-item')}
							>
								Resources
							</Typography>
						</ListItem>
					</NavLink>

					<NavLink to="/store">
						<ListItem
							aria-describedby="store"
							className={clsx(classes.listItem)}
						>
							<Typography
								variant="body1"
								color="textPrimary"
								className={clsx(classes.listItemText, 'menu-item')}
							>
								Store
							</Typography>
						</ListItem>
					</NavLink>
				</List>
			)}
			<div className={classes.flexGrow} />
			{hidden && (
				<List disablePadding className={classes.navigationContainer}>
					<ListItem
						aria-describedby="dashboard"
						onClick={(e) => handleClick(e, 'store')}
						className={clsx(classes.listItem)}
					>
						{authService.isAuthenticated() && (
							<NavLink
								to={isArrayNotNull(devices) ? '/dashboard' : '/my-device'}
							>
								<Button color="primary">Dashboard</Button>
							</NavLink>
						)}
					</ListItem>
					<ListItem className="menu-item--no-dropdown">
						<DarkModeToggler
							themeMode={themeMode}
							onChange={() => themeToggler()}
							size={24}
						/>
					</ListItem>
					{renderAuthButtons()}
				</List>
			)}
			{/* <DarkModeToggler */}
			{/*	themeMode={themeMode} */}
			{/*	onChange={() => themeToggler()} */}
			{/*	size={24} */}
			{/*	sx={{ display: { xl: 'block', xs: 'none' } }} */}
			{/* /> */}
			{hidden ? null : (
				<IconButton
					className={classes.iconButton}
					onClick={() => onSidebarOpen()}
					aria-label="Menu"
					sx={{ display: { xl: 'block', sm: 'block' } }}
				>
					<MenuIcon />
				</IconButton>
			)}
		</Toolbar>
	);
};

export default Topbar;
