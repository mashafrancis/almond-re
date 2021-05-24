import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { Badge } from '@material-ui/core';

export const StyledBadge = withStyles((theme: Theme) =>
	createStyles({
		badge: {
			// backgroundColor: theme.palette.primary.main,
			// color: theme.palette.primary.main,
			// boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
			'&::after': {
				position: 'absolute',
				// top: 0,
				// left: 0,
				width: '100%',
				height: '100%',
				borderRadius: '50%',
				animation: '$ripple 1.2s infinite ease-in-out',
				border: '1px solid currentColor',
				content: '""',
			},
		},
		'@keyframes ripple': {
			'0%': {
				transform: 'scale(.8)',
				opacity: 1,
			},
			'100%': {
				transform: 'scale(2.4)',
				opacity: 0,
			},
		},
	}),
)(Badge);

export const useStyles = makeStyles((theme: Theme) => ({
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
		// marginLeft: 100,
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
		width: '60%',
		height: '60%',
		minWidth: 32,
		// fontWeight: theme.typography.fontWeightMedium,
		// fontSize: '13px',
		// marginRight: theme.spacing(4),
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
		margin: 0,
		padding: 0,
		fontWeight: theme.typography.fontWeightMedium,
		fontSize: '13px',
		color: '#fff',
		[theme.breakpoints.up('sm')]: {
			color: '#fff',
		},
	},
	topDevice: {
		position: 'relative',
		display: 'flex',
		maxWidth: 'fit-content',
		padding: '4px 40px',
		marginLeft: theme.spacing(12),
		marginRight: theme.spacing(4),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
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
	},
	sectionEnd: {
		display: 'inline-flex',
		justifyContent: 'flex-end',
		order: 1,
	},
	blankState: {
		font: '300 36px/44px Google Sans,Helvetica Neue,sans-serif',
		letterSpacing: 'normal',
		marginBottom: 24,
		color: theme.palette.text.secondary,
	},
}));
