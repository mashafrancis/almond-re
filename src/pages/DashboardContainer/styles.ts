import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useDashboardContainerStyles = makeStyles((theme: Theme) =>
	createStyles({
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
	}),
);
