import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

interface MenuTabProps {
	label: string;
	icon: any;
}

const MenuTabs = withStyles((theme: Theme) =>
	createStyles({
		root: {
			// borderBottom: '1px solid #e8e8e8',
		},
		indicator: {
			backgroundColor: theme.palette.primary.main,
			display: 'none',
		},
	}),
)(Tabs);

const MenuTab = withStyles((theme: Theme) =>
	createStyles({
		root: {
			marginBottom: 10,
			marginTop: 10,
			textTransform: 'none',
			minWidth: 72,
			fontWeight: theme.typography.fontWeightMedium,
			fontSize: '13px',
			// marginRight: theme.spacing(4),
			fontFamily: [
				'"Google Sans"',
				'Roboto',
				'"Helvetica Neue"',
				'sans-serif',
			].join(','),
			'&:hover': {
				color: theme.palette.primary.main,
				backgroundColor: theme.palette.background.level2,
				opacity: 1,
			},
			'&$selected': {
				color: theme.palette.primary.main,
				fontWeight: theme.typography.fontWeightMedium,
			},
			'&:focus': {
				color: theme.palette.primary.main,
			},
		},
		selected: {},
	}),
)((props: MenuTabProps) => <Tab disableRipple {...props} />);

export { MenuTabs, MenuTab };
