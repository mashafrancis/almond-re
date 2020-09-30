import { Badge } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';

export const useTopBarStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			'& > *': {
				margin: theme.spacing(1),
			},
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			display: 'flex',
			'& > *': {
				margin: theme.spacing(1),
			},
			backgroundColor: 'white',
			borderBottom: '1px solid #dadce0',
			margin: '0px !important',
		},
		grow: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			display: 'none',
			color: 'rgba(17, 17, 17, 0.8)',
			[theme.breakpoints.up('sm')]: {
				display: 'block',
			},
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
			// flexGrow: 1,
			// display: 'none',
			// [theme.breakpoints.up('sm')]: {
			//   display: 'block',
			// },
		},
		hide: {
			display: 'none',
		},
	}),
);

export const StyledBadge = withStyles((theme: Theme) =>
	createStyles({
		badge: {
			backgroundColor: '#1967D2',
			color: '#1967D2',
			boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
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
