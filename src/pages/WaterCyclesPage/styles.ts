import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import { Switch } from '@material-ui/core';

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
