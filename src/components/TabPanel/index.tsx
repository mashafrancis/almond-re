import { Box } from '@material-ui/core';

// interfaces
import { TabPanelProps } from '@components/TabPanel/interfaces';

const TabPanel = ({
	children,
	value,
	index,
	...other
}: TabPanelProps): JSX.Element => {
	return (
		<div
			data-testid="tab-panel"
			className="tab-panel"
			role="tabpanel"
			hidden={value !== index}
			id={`menu-tabpanel-${index}`}
			aria-labelledby={`menu-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
};

export default TabPanel;
