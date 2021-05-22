import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import {
	AppBar,
	Box,
	IconButton,
	Toolbar,
	List,
	ListItem,
	Button,
	makeStyles,
	useMediaQuery,
} from '@material-ui/core';
import { Image, DarkModeToggler } from '@components/atoms';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '@components/atoms/Logo';
import fancyId from '@utils/fancyId';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import { Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	logoContainer: {
		width: 100,
		height: 28,
		[theme.breakpoints.up('md')]: {
			width: 120,
			height: 32,
		},
	},
	logoImage: {
		width: '100%',
		height: '100%',
	},
	navigationContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	listItem: {
		paddingRight: 0,
	},
	listItemText: {
		flex: '0 0 auto',
		whiteSpace: 'nowrap',
	},
	listItemButton: {
		whiteSpace: 'nowrap',
	},
	iconButton: {
		paddingRight: 0,
		'&:hover': {
			background: 'transparent',
		},
	},
}));

interface Props {
	className?: string;
	onMobileNavOpen: Function;
	themeToggler: Function;
	themeMode: string;
}

const TopBar = ({
	className,
	onMobileNavOpen,
	themeToggler,
	themeMode,
	...rest
}: Props): JSX.Element => {
	const classes = useStyles();
	const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

	return (
		<AppBar
			className={clsx(classes.root, className)}
			elevation={0}
			color="inherit"
			{...rest}
		>
			<Toolbar>
				<div className={classes.logoContainer}>
					<Logo themeMode={themeMode} />
				</div>
				<Box flexGrow={1} />
				<DarkModeToggler
					themeMode={themeMode}
					onChange={() => themeToggler()}
					size={24}
				/>
				{hidden ? (
					<List disablePadding className={classes.navigationContainer}>
						<ListItem
							className={clsx(classes.listItem, 'menu-item--no-dropdown')}
						>
							<NavLink key={fancyId()} to="/store">
								<Button variant="contained" color="primary">
									Visit our store
									<NavigateNextRoundedIcon />
								</Button>
							</NavLink>
						</ListItem>
					</List>
				) : (
					<IconButton
						onClick={() => onMobileNavOpen()}
						className={classes.iconButton}
						aria-label="Menu"
						disableRipple
					>
						<MenuIcon />
					</IconButton>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default TopBar;
