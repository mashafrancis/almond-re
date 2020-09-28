import React from 'react';

// third party
import { Box, Typography } from '@material-ui/core';

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
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
};

export default TabPanel;
