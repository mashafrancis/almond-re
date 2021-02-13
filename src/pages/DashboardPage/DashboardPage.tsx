import LinearProgressBar from '@components/LinearProgressBar';
import TabPanel from '@components/TabPanel';
import { Grid, Hidden } from '@material-ui/core';
import { createElement, lazy, Suspense, useContext } from 'react';
import { ComponentContext } from '@context/ComponentContext';
import { AdminMenus, UserMenus } from '@components/MenuRoutes';
import { UserContext } from '@context/UserContext';
import PageBottomNavigation from '@components/BottomNavigation';

const DashboardPage = (): JSX.Element => {
	const { selectedIndex } = useContext(ComponentContext);
	const { isAdmin } = useContext(UserContext);

	const checkIsAdmin = () => (isAdmin ? AdminMenus : UserMenus);

	return (
		<Grid container>
			<Grid item xs={12} md={12}>
				<TabPanel index={selectedIndex} value={selectedIndex}>
					{createElement(checkIsAdmin()[selectedIndex].component, {
						history,
					})}
				</TabPanel>
			</Grid>
		</Grid>
	);
};

export default DashboardPage;
