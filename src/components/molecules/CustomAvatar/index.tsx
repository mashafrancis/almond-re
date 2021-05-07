import { ComponentContext } from '@context/ComponentContext';
import { UserContext } from '@context/UserContext';
import { Avatar, Menu, MenuItem, ListItemIcon } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
	Mood,
	ExitToApp,
	Help,
	OpenInNew,
	Settings,
} from '@material-ui/icons';
import { logoutUser } from '@modules/user';
import fancyId from '@utils/fancyId';
import { useContext, useState, MouseEvent } from 'react';

import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
	avatar: {
		width: '40px',
		height: '40px',
		cursor: 'pointer',
		margin: '4px',
	},
	menuPopup: {
		right: 16,
		left: 'unset !important',
	},
});

interface Props {
	hasMultipleRoles?: boolean;
}

const CustomAvatar = ({ hasMultipleRoles = false }: Props): JSX.Element => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { avatar, menuPopup } = useStyles();
	const { name, photo, isAdmin } = useContext(UserContext);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleToggleProfileMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleProfileClose = () => setAnchorEl(null);

	const { toggleRoleChangeDialog } = useContext(ComponentContext);

	const handleRoleModal = () => {
		handleProfileClose();
		toggleRoleChangeDialog();
	};

	const logoutActiveUser = async (): Promise<void> => {
		await window.location.replace('/');
		dispatch(logoutUser());
	};

	const open = Boolean(anchorEl);
	const location = useLocation();

	let menuItems = [
		{ name: 'Settings', icon: <Settings />, link: 'account' },
		{ name: 'Help', icon: <Help />, link: 'help' },
		{ name: 'Send Feedback', icon: <OpenInNew />, link: 'send-feedback' },
	];

	if (location.pathname === '/') {
		menuItems = menuItems.filter((item) => {
			return item.name !== 'Settings';
		});
	}

	return (
		<>
			<Avatar
				className={avatar}
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
					paper: menuPopup,
				}}
				style={{ top: '44px', right: '16px' }}
				anchorEl={anchorEl}
				open={open}
				keepMounted
				onClose={handleProfileClose}
			>
				{menuItems.map((item) => {
					const handleClick = () => {
						handleProfileClose();
						history.push(item.link);
					};
					return (
						<MenuItem key={fancyId()} onClick={handleClick}>
							<ListItemIcon style={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
							{item.name}
						</MenuItem>
					);
				})}
				{location.pathname === '/dashboard' && hasMultipleRoles && (
					<MenuItem onClick={handleRoleModal}>
						<ListItemIcon style={{ minWidth: 40 }}>
							<Mood />
						</ListItemIcon>
						Change role
					</MenuItem>
				)}

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

export default CustomAvatar;
