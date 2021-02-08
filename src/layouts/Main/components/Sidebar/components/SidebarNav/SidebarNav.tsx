/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
	List,
	ListItem,
	Typography,
	ListItemIcon,
	Divider,
	Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import { NavLink } from 'react-router-dom';
import authService from '@utils/auth';
import { MenuGroupProps, PagesProps } from '../../../../../interfaces';

const useStyles = makeStyles((theme) => ({
	root: {},
	listItem: {
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	navLink: {
		'&:hover': {
			color: theme.palette.primary.dark,
		},
	},
	listItemIcon: {
		minWidth: 'auto',
	},
	listItemText: {
		flex: '0 0 auto',
		// marginLeft: theme.spacing(0),
		whiteSpace: 'nowrap',
	},
	closeIcon: {
		justifyContent: 'flex-end',
		cursor: 'pointer',
	},
	menu: {
		display: 'flex',
	},
	menuItem: {
		marginRight: theme.spacing(8),
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
	divider: {
		width: '100%',
	},
}));

interface Props {
	className?: string;
	onClose: Function;
	pages: PagesProps;
}

const SidebarNav = ({
	pages,
	onClose,
	className,
	...rest
}: Props): JSX.Element => {
	const classes = useStyles();

	const MenuGroup = ({ item }: MenuGroupProps): JSX.Element => (
		<List disablePadding>
			<ListItem disableGutters>
				<Typography
					variant="body2"
					color="primary"
					className={classes.menuGroupTitle}
				>
					{item.groupTitle}
				</Typography>
			</ListItem>
			{item.pages.map((page, i) => (
				<ListItem disableGutters key={i} className={classes.menuGroupItem}>
					<Typography
						variant="body2"
						component="a"
						href={page.href}
						className={clsx(classes.navLink, 'submenu-item')}
						color="textPrimary"
						onClick={() => onClose()}
					>
						{page.title}
					</Typography>
				</ListItem>
			))}
		</List>
	);

	const LandingPages = (): JSX.Element => {
		return (
			<div className={classes.menu}>
				<div className={classes.menuItem}>
					<NavLink to="/resources">
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
					<NavLink to="/portfolio">
						<ListItem
							aria-describedby="resources"
							className={clsx(classes.listItem)}
						>
							<Typography
								variant="body1"
								color="textPrimary"
								className={clsx(classes.listItemText, 'menu-item')}
							>
								Portfolio
							</Typography>
						</ListItem>
					</NavLink>
				</div>
			</div>
		);
	};

	const AccountPages = (): JSX.Element => {
		return (
			<div className={classes.menu}>
				<div className={classes.menuItem}>
					<NavLink to="/register">
						<ListItem
							aria-describedby="register"
							className={clsx(classes.listItem)}
						>
							<Typography
								variant="body1"
								color="textPrimary"
								className={clsx(classes.listItemText, 'menu-item')}
							>
								Register
							</Typography>
						</ListItem>
					</NavLink>
					<NavLink to="/login">
						<ListItem
							aria-describedby="login"
							className={clsx(classes.listItem)}
						>
							<Typography
								variant="body1"
								color="textPrimary"
								className={clsx(classes.listItemText, 'menu-item')}
							>
								Login
							</Typography>
						</ListItem>
					</NavLink>
				</div>
			</div>
		);
	};

	const ProfilePages = (): JSX.Element => {
		return (
			<div className={classes.menu}>
				<div className={classes.menuItem}>
					<NavLink to="/profile">
						<ListItem
							aria-describedby="profile"
							className={clsx(classes.listItem)}
						>
							<Typography
								variant="body1"
								color="textPrimary"
								className={clsx(classes.listItemText, 'menu-item')}
							>
								Profile
							</Typography>
						</ListItem>
					</NavLink>
					<NavLink to="/settings">
						<ListItem
							aria-describedby="settings"
							className={clsx(classes.listItem)}
						>
							<Typography
								variant="body1"
								color="textPrimary"
								className={clsx(classes.listItemText, 'menu-item')}
							>
								Settings
							</Typography>
						</ListItem>
					</NavLink>
					<ListItem
						aria-describedby="logout"
						className={clsx(classes.listItem)}
					>
						<Typography
							variant="body1"
							color="textPrimary"
							className={clsx(classes.listItemText, 'menu-item')}
						>
							Logout
						</Typography>
					</ListItem>
				</div>
			</div>
		);
	};

	return (
		<List {...rest} className={clsx(classes.root, className)}>
			<ListItem className={classes.closeIcon} onClick={() => onClose()}>
				<ListItemIcon className={classes.listItemIcon}>
					<CloseIcon fontSize="small" />
				</ListItemIcon>
			</ListItem>
			<ListItem className={classes.listItem}>
				<Typography variant="h6" color="textPrimary" gutterBottom>
					Landings
				</Typography>
				<LandingPages />
			</ListItem>
			<ListItem className={classes.listItem}>
				<Divider className={classes.divider} />
			</ListItem>
			<ListItem className={classes.listItem}>
				<Typography variant="h6" color="textPrimary" gutterBottom>
					Account
				</Typography>
				{authService.isAuthenticated() ? <ProfilePages /> : <AccountPages />}
			</ListItem>
			<ListItem className={classes.listItem}>
				<Divider className={classes.divider} />
			</ListItem>
			<ListItem className={classes.listItem}>
				<NavLink to="/store">
					<Button
						variant="contained"
						color="primary"
						fullWidth
						endIcon={<LocalGroceryStoreIcon />}
					>
						Go to store
					</Button>
				</NavLink>
			</ListItem>
		</List>
	);
};

export default SidebarNav;
