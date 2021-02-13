import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import { Switch } from '@material-ui/core';
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
			border: 'none',
			'& .table-header': {
				color: theme.palette.primary.main,
				// fontWeight: 500,
			},
			'& .table-cell': {
				fontWeight: '500',
				fontSize: 20,
			},
		},
	}),
);

export const useNoRowsStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexDirection: 'column',
			'& .ant-empty-img-1': {
				fill: theme.palette.type === 'light' ? '#aeb8c2' : '#262626',
			},
			'& .ant-empty-img-2': {
				fill: theme.palette.type === 'light' ? '#f5f5f7' : '#595959',
			},
			'& .ant-empty-img-3': {
				fill: theme.palette.type === 'light' ? '#dce0e6' : '#434343',
			},
			'& .ant-empty-img-4': {
				fill: theme.palette.type === 'light' ? '#fff' : '#1c1c1c',
			},
			'& .ant-empty-img-5': {
				fillOpacity: theme.palette.type === 'light' ? '0.8' : '0.08',
				fill: theme.palette.type === 'light' ? '#f5f5f5' : '#fff',
			},
		},
		label: {
			marginTop: theme.spacing(1),
			marginBottom: 40,
			fontFamily: 'San Francisco, serif !important',
			fontSize: 20,
			fontWeight: 300,
			// letterSpacing: -2,
			// wordSpacing: 2,
		},
	}),
);
