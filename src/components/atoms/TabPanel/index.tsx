import { Box, useMediaQuery } from '@material-ui/core';
// interfaces
import { TabPanelProps } from '@components/atoms/TabPanel/interfaces';
import {
	createStyles,
	makeStyles,
	Theme,
	useTheme,
} from '@material-ui/core/styles';

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

	const themePoint = useTheme();
	const isSm = useMediaQuery(themePoint.breakpoints.down('sm'), {
		defaultMatches: true,
	});
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`menu-tabpanel-${index}`}
			aria-labelledby={`menu-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box
					sx={{
						padding: `${isSm ? '0' : '0'}`,
						marginBottom: `${isSm ? '60px' : '60px'}`,
					}}
					p={3}
					{...other}
					data-testid="tab-panel"
				>
					{children}
				</Box>
			)}
		</div>
	);
};

export default TabPanel;
