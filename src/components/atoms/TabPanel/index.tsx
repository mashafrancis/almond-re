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
			margin: 20,
			[theme.breakpoints.down('sm')]: {
				padding: 0,
				marginBottom: 60,
				marginLeft: 0,
				marginRight: 0,
				marginTop: 0,
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
						padding: 0,
						marginBottom: 0,
						marginTop: '20px',
						marginLeft: 0,
						marginRight: 0,
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
