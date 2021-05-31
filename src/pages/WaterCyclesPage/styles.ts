import { createStyles, makeStyles } from '@material-ui/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import { Switch } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { primaryColor } from '../../assets/tss/common';

export const useWaterCyclesPageStyles = makeStyles((theme: Theme) =>
	createStyles({
		thumb: {
			animation: '$blink 1s ease infinite',
		},
		'@keyframes blink': {
			'from, to': {
				opacity: 1,
			},
			'50%': {
				opacity: 0.7,
				backgroundColor: '#1967D2',
			},
		},
	}),
);

export const ToggleSwitch = withStyles({
	root: {
		color: primaryColor,
		'&$checked': {
			color: primaryColor,
		},
	},
	switchBase: {
		color: '#FFFFFF',
		'&$checked': {
			color: '#1967D2',
		},
		'&$checked + $track': {
			backgroundColor: '#1967D2',
		},
	},
	checked: {},
	track: {},
})(Switch);

export const useTableStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			border: 0,
			WebkitFontSmoothing: 'auto',
			'& .MuiDataGrid-iconSeparator': {
				display: 'none',
			},
			'& .MuiDataGrid-cell:focus-within': {
				// outline: 'solid #1967D2 0.8px',
				outlineOffset: '-1px',
				outline: 'none',
			},
			// '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
			// 	paddingLeft: 2,
			// 	paddingRight: 2,
			// },
			'& .MuiPaginationItem-root': {
				borderRadius: 0,
			},
			'& .table-header': {
				color: theme.palette.primary.main,
				// fontWeight: 500,
			},
			'& .table-cell': {
				fontWeight: 500,
				fontSize: 20,
			},
			'& .MuiDataGrid-cell': {
				[theme.breakpoints.down('sm')]: {
					fontSize: 12,
				},
			},
		},
	}),
);
