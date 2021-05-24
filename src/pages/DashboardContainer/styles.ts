import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

export const useDashboardContainerStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			height: '100%',
			width: '100%',
		},
		focused: {},
		listItemPadding: {
			paddingTop: 0,
			paddingBottom: 0,
		},
		selectHeight: {
			height: '1.25em',
		},
		labelColor: {
			'&$focused': {
				color: `rgba(${25},${103},${210},${0.87})`,
			},
		},
		font: {
			fontFamily:
				'"Google Sans", "Roboto", "Helvetica Neue", sans-serif !important',
		},
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			// color: '#fff',
			backgroundColor: 'rgba(0, 0, 0, 0.1)',
		},
		blankState: {
			font: '300 36px/44px Google Sans,Helvetica Neue,sans-serif',
			letterSpacing: 'normal',
			marginBottom: 24,
			color: theme.palette.text.secondary,
		},
		section: {
			'& .section-alternate__content': {
				paddingTop: 0,
				[theme.breakpoints.down('sm')]: {
					padding: theme.spacing(0, 1, 8),
				},
				marginTop: theme.spacing(-4),
				position: 'relative',
				zIndex: 1,
				maxWidth: 'unset',
			},
			'& .card-base__content': {
				padding: theme.spacing(2),
				[theme.breakpoints.up('md')]: {
					padding: theme.spacing(3),
				},
			},
		},
		swipeableHeading: {
			background: theme.palette.alternate.main,
			padding: 10,
			borderRadius: 4,
		},
	}),
);
