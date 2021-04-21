import { Box } from '@material-ui/core';
// interfaces
import { TabPanelProps } from '@components/atoms/TabPanel/interfaces';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		box: {
			[theme.breakpoints.down('sm')]: {
				padding: 0,
				marginBottom: 60,
			},
		},
	}),
);

const TabPanel = ({
	children,
	value,
	index,
	...other
}: TabPanelProps): JSX.Element => {
	const classes = useStyles();
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`menu-tabpanel-${index}`}
			aria-labelledby={`menu-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box className={classes.box} p={3} {...other} data-testid="tab-panel">
					{children}
				</Box>
			)}
		</div>
	);
};

export default TabPanel;