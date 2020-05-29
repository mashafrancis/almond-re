import * as React from 'react';

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
  Spa
} from '@material-ui/icons';

// pages
const AnalyticsPage = React.lazy(() => import('@pages/AnalyticsPage'));
const DeviceManagementPage = React.lazy(() => import('@pages/DeviceManagementPage'));
const EnergyMonitoringPage = React.lazy(() => import('@pages/EnergyMonitoringPage'));
const EnvironmentControlPage = React.lazy(() => import('@pages/EnvironmentControlPage'));
const HelpPage = React.lazy(() => import('@pages/HelpPage'));
const PeoplePage = React.lazy(() => import('@pages/PeoplePage'));
const QualityCheckPage = React.lazy(() => import('@pages/QualityCheckPage'));
const SettingsPage = React.lazy(() => import('@pages/SettingsPage'));
const SupportPage = React.lazy(() => import('@pages/SupportPage'));
const UserRolesPage = React.lazy(() => import('@pages/UserRolesPage'));
const WaterCyclesPage = React.lazy(() => import('@pages/WaterCyclesPage'));

// interfaces
import { MenuBottomProps, MenuComponentProps } from '@components/MenuRoutes/interfaces';

export const UserMenus: MenuComponentProps[][] = [
  [
    {
      icon: <WidgetsRounded/>,
      primaryText: 'Analytics',
      component: AnalyticsPage,
    },
    {
      icon: <Opacity/>,
      primaryText: 'Water Cycles',
      component: WaterCyclesPage,
    },
    {
      icon: <ControlCamera/>,
      primaryText: 'Environmental Control',
      component: EnvironmentControlPage,
    },
    {
      icon: <Security/>,
      primaryText: 'Quality Control',
      component: QualityCheckPage,
    },
    {
      icon: <Memory/>,
      primaryText: 'Energy Usage',
      component: EnergyMonitoringPage,
    },
    {
      icon: <LocalFlorist/>,
      primaryText: 'Support',
      component: SupportPage,
    },
  ],
  [
    {
      icon: <Settings/>,
      primaryText: 'Settings',
      component: SettingsPage,
    },
    {
      icon: <Help/>,
      primaryText: 'Help',
      component: HelpPage,
    },
    {
      icon: <OpenInNew/>,
      primaryText: 'Send feedback',
      component: AnalyticsPage,
    },
  ],
];

export const AdminMenus: MenuComponentProps[][] = [
  [
    {
      icon: <WidgetsRounded/>,
      primaryText: 'Analytics',
      component: AnalyticsPage,
    },
    {
      icon: <AllOut/>,
      primaryText: 'Devices',
      component: DeviceManagementPage,
    },
    {
      icon: <People/>,
      primaryText: 'People',
      component: PeoplePage,
    },
    {
      icon: <BubbleChart/>,
      primaryText: 'Roles',
      component: UserRolesPage,
    },
    {
      icon: <Spa/>,
      primaryText: 'Support',
      component: SupportPage,
    },
  ],
  [
    {
      icon: <Settings/>,
      primaryText: 'Settings',
      component: PeoplePage,
    },
    {
      icon: <Help/>,
      primaryText: 'Help',
      component: HelpPage,
    },
  ],
];

export const BottomNavigationMenus: MenuBottomProps[] = [
  {
    icon: <WidgetsRounded/>,
    label: 'Analytics',
    value: 'analytics',
  },
  {
    icon: <Opacity/>,
    label: 'Water',
    value: 'water',
  },
  {
    icon: <ControlCamera/>,
    label: 'Environmental',
    value: 'environment',
  },
  {
    icon: <Security/>,
    label: 'Quality',
    value: 'quality',
  },
  {
    icon: <Memory/>,
    label: 'Energy',
    value: 'energy',
  },
];

export const AdminBottomNavigationMenus: MenuBottomProps[] = [
  {
    icon: <WidgetsRounded/>,
    label: 'Analytics',
    value: 'analytics',
  },
  {
    icon: <AllOut/>,
    label: 'Devices',
    value: 'devices',
  },
  {
    icon: <People/>,
    label: 'People',
    value: 'people',
  },
  {
    icon: <BubbleChart/>,
    label: 'Roles',
    value: 'roles',
  },
  {
    icon: <Spa/>,
    label: 'Requests',
    value: 'requests',
  },
];
