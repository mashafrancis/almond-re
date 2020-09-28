import React, { lazy } from 'react';

import {
	WidgetsRounded,
	Opacity,
	ControlCamera,
	Security,
	Memory,
	LocalFlorist,
	Settings,
	Help,
	OpenInNew,
	AllOut,
	People,
	BubbleChart,
	Spa,
} from '@material-ui/icons';

// interfaces
import {
	MenuBottomProps,
	MenuComponentProps,
} from '@components/MenuRoutes/interfaces';

// pages
// import AnalyticsPage from '@pages/AnalyticsPage';
// import WaterCyclesPage from '@pages/WaterCyclesPage';
// import EnvironmentControlPage from '@pages/EnvironmentControlPage';
// import QualityCheckPage from '@pages/QualityCheckPage';
// import EnergyMonitoringPage from '@pages/EnergyMonitoringPage';
// import SupportPage from '@pages/SupportPage';
// import SettingsPage from '@pages/SettingsPage';
// import HelpPage from '@pages/HelpPage';
// import DeviceManagementPage from '@pages/DeviceManagementPage';
// import PeoplePage from '@pages/PeoplePage';
// import UserRolesPage from '@pages/UserRolesPage';

// :TODO: Implement React Suspense lazy loading once feature is released
// pages
const AnalyticsPage = lazy(() => import('@pages/AnalyticsPage'));
const DeviceManagementPage = lazy(() => import('@pages/DeviceManagementPage'));
const EnergyMonitoringPage = lazy(() => import('@pages/EnergyMonitoringPage'));
const EnvironmentControlPage = lazy(
	() => import('@pages/EnvironmentControlPage'),
);
const HelpPage = lazy(() => import('@pages/HelpPage'));
const PeoplePage = lazy(() => import('@pages/PeoplePage'));
const QualityCheckPage = lazy(() => import('@pages/QualityCheckPage'));
const SettingsPage = lazy(() => import('@pages/SettingsPage'));
const SupportPage = lazy(() => import('@pages/SupportPage'));
const UserRolesPage = lazy(() => import('@pages/UserRolesPage'));
const WaterCyclesPage = lazy(() => import('@pages/WaterCyclesPage'));

export const UserMenus: MenuComponentProps[][] = [
	[
		{
			icon: <WidgetsRounded />,
			primaryText: 'Analytics',
			component: AnalyticsPage,
		},
		{
			icon: <Opacity />,
			primaryText: 'Water Cycles',
			component: WaterCyclesPage,
		},
		{
			icon: <ControlCamera />,
			primaryText: 'Environmental Control',
			component: EnvironmentControlPage,
		},
		{
			icon: <Security />,
			primaryText: 'Quality Control',
			component: QualityCheckPage,
		},
		{
			icon: <Memory />,
			primaryText: 'Energy Usage',
			component: EnergyMonitoringPage,
		},
		{
			icon: <LocalFlorist />,
			primaryText: 'Support',
			component: SupportPage,
		},
	],
	[
		{
			icon: <Settings />,
			primaryText: 'Settings',
			component: SettingsPage,
		},
		{
			icon: <Help />,
			primaryText: 'Help',
			component: HelpPage,
		},
		{
			icon: <OpenInNew />,
			primaryText: 'Send feedback',
			component: AnalyticsPage,
		},
	],
];

export const AdminMenus: MenuComponentProps[][] = [
	[
		{
			icon: <WidgetsRounded />,
			primaryText: 'Analytics',
			component: AnalyticsPage,
		},
		{
			icon: <AllOut />,
			primaryText: 'Devices',
			component: DeviceManagementPage,
		},
		{
			icon: <People />,
			primaryText: 'People',
			component: PeoplePage,
		},
		{
			icon: <BubbleChart />,
			primaryText: 'Roles',
			component: UserRolesPage,
		},
		{
			icon: <Spa />,
			primaryText: 'Support',
			component: SupportPage,
		},
	],
	[
		{
			icon: <Settings />,
			primaryText: 'Settings',
			component: PeoplePage,
		},
		{
			icon: <Help />,
			primaryText: 'Help',
			component: HelpPage,
		},
	],
];

export const BottomNavigationMenus: MenuBottomProps[] = [
	{
		icon: <WidgetsRounded />,
		label: 'Analytics',
		value: 'analytics',
	},
	{
		icon: <Opacity />,
		label: 'Water',
		value: 'water',
	},
	{
		icon: <ControlCamera />,
		label: 'Environmental',
		value: 'environment',
	},
	{
		icon: <Security />,
		label: 'Quality',
		value: 'quality',
	},
	{
		icon: <Memory />,
		label: 'Energy',
		value: 'energy',
	},
];

export const AdminBottomNavigationMenus: MenuBottomProps[] = [
	{
		icon: <WidgetsRounded />,
		label: 'Analytics',
		value: 'analytics',
	},
	{
		icon: <AllOut />,
		label: 'Devices',
		value: 'devices',
	},
	{
		icon: <People />,
		label: 'People',
		value: 'people',
	},
	{
		icon: <BubbleChart />,
		label: 'Roles',
		value: 'roles',
	},
	{
		icon: <Spa />,
		label: 'Requests',
		value: 'requests',
	},
];
