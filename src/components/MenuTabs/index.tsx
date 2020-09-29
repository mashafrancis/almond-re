import React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { primaryColor } from '../../assets/tss/common';

interface MenuTabProps {
	label: string;
	icon: any;
}

const MenuTabs = withStyles({
	root: {
		borderBottom: '1px solid #e8e8e8',
	},
	indicator: {
		backgroundColor: primaryColor,
		display: 'none',
	},
})(Tabs);

const MenuTab = withStyles((theme: Theme) =>
	createStyles({
		root: {
			textTransform: 'none',
			minWidth: 72,
			fontWeight: theme.typography.fontWeightMedium,
			fontSize: '13px',
			marginRight: theme.spacing(4),
			fontFamily: [
				'"Google Sans"',
				'Roboto',
				'"Helvetica Neue"',
				'sans-serif',
			].join(','),
			'&:hover': {
				color: primaryColor,
				opacity: 1,
			},
			'&$selected': {
				color: primaryColor,
				fontWeight: theme.typography.fontWeightMedium,
			},
			'&:focus': {
				color: primaryColor,
			},
		},
		selected: {},
	}),
)((props: MenuTabProps) => <Tab disableRipple {...props} />);

export { MenuTabs, MenuTab };
