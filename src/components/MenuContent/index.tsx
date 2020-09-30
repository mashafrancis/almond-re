import React, { useContext } from 'react';
// components
import { AdminMenus, UserMenus } from '@components/MenuRoutes';
import { UserContext } from '@context/UserContext';
import { ComponentContext } from '@context/ComponentContext';
import { MenuTab, MenuTabs } from '@components/MenuTabs';
// styles
import '@pages/DashboardContainer/DashboardNavBar.scss';
import './MenuContext.scss';

const MenuContent = (): JSX.Element => {
	const { selectedIndex, setSelectedIndex } = useContext(ComponentContext);
	const { isAdmin } = useContext(UserContext);

	const checkIsAdmin = () => (isAdmin ? AdminMenus : UserMenus);

	const handleOnChange = (event: React.ChangeEvent<{}>, value: number) => {
		setSelectedIndex(value);
	};

	const a11yProps = (index: number | string) => {
		return {
			id: `menu-tab-${index}`,
			'aria-controls': `menu-tabpanel-${index}`,
		};
	};

	return (
		<div className="menu-content">
			<MenuTabs
				value={selectedIndex}
				onChange={handleOnChange}
				orientation="vertical"
				scrollButtons="off"
				textColor="primary"
				aria-label="menu tabs"
			>
				{checkIsAdmin()
					.slice(0, 6)
					.map((item) => (
						<MenuTab
							key={item.primaryText}
							label={item.primaryText}
							icon={item.icon}
							{...a11yProps(selectedIndex)}
						/>
					))}
			</MenuTabs>
		</div>
	);
};

export default MenuContent;
