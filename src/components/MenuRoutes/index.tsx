import * as React from 'react';

import MaterialIcon from '@material/react-material-icon';

// pages
import AnalyticsPage from '@pages/AnalyticsPage';
import DeviceManagementPage from '@pages/DeviceManagementPage';
import EnergyMonitoringPage from '@pages/EnergyMonitoringPage';
import EnvironmentControlPage from '@pages/EnvironmentControlPage';
import PeoplePage from '@pages/PeoplePage';
import QualityCheckPage from '@pages/QualityCheckPage';
import UserRolesPage from '@pages/UserRolesPage';
import WaterCyclesPage from '@pages/WaterCyclesPage';

// interfaces
import { MenuBottomProps, MenuComponentProps } from '@components/MenuRoutes/interfaces';

export const UserMenus: MenuComponentProps[][] = [
  [
    {
      icon: 'widgets',
      primaryText: 'Analytics',
      component: AnalyticsPage,
    },
    {
      icon: 'opacity',
      primaryText: 'Water Cycles',
      component: WaterCyclesPage,
    },
    {
      icon: 'control_camera',
      primaryText: 'Environmental Control',
      component: EnvironmentControlPage,
    },
    {
      icon: 'security',
      primaryText: 'Quality Control',
      component: QualityCheckPage,
    },
    {
      icon: 'memory',
      primaryText: 'Energy Usage',
      component: EnergyMonitoringPage,
    },
    {
      icon: 'local_florist',
      primaryText: 'Support',
      component: DeviceManagementPage,
    },
  ],
  [
    {
      icon: 'settings',
      primaryText: 'Settings',
      component: PeoplePage,
    },
    {
      icon: 'help',
      primaryText: 'Help',
      component: AnalyticsPage,
    },
    {
      icon: 'open_in_new',
      primaryText: 'Send feedback',
      component: AnalyticsPage,
    },
  ],
];

export const AdminMenus: MenuComponentProps[][] = [
  [
    {
      icon: 'widgets',
      primaryText: 'Analytics',
      component: AnalyticsPage,
    },
    {
      icon: 'all_out',
      primaryText: 'Devices',
      component: DeviceManagementPage,
    },
    {
      icon: 'people',
      primaryText: 'People',
      component: PeoplePage,
    },
    {
      icon: 'bubble_chart',
      primaryText: 'Roles',
      component: UserRolesPage,
    },
    {
      icon: 'spa',
      primaryText: 'Requests',
      component: UserRolesPage,
    },
  ],
  [
    {
      icon: 'settings',
      primaryText: 'Settings',
      component: PeoplePage,
    },
    {
      icon: 'help',
      primaryText: 'Help',
      component: AnalyticsPage,
    },
  ],
];

export const BottomNavigationMenus: MenuBottomProps[] = [
  {
    icon: <MaterialIcon hasRipple icon="widgets" initRipple={null}/>,
    label: 'Analytics',
    value: 'analytics',
  },
  {
    icon: <MaterialIcon hasRipple icon="opacity" initRipple={null}/>,
    label: 'Water',
    value: 'water',
  },
  {
    icon: <MaterialIcon hasRipple icon="control_camera" initRipple={null}/>,
    label: 'Environmental',
    value: 'environment',
  },
  {
    icon: <MaterialIcon hasRipple icon="security" initRipple={null}/>,
    label: 'Quality',
    value: 'quality',
  },
  {
    icon: <MaterialIcon hasRipple icon="memory" initRipple={null}/>,
    label: 'Energy',
    value: 'energy',
  },
];

export const AdminBottomNavigationMenus: MenuBottomProps[] = [
  {
    icon: <MaterialIcon hasRipple icon="widgets" initRipple={null}/>,
    label: 'Analytics',
    value: 'analytics',
  },
  {
    icon: <MaterialIcon hasRipple icon="all_out" initRipple={null}/>,
    label: 'Devices',
    value: 'devices',
  },
  {
    icon: <MaterialIcon hasRipple icon="people" initRipple={null}/>,
    label: 'People',
    value: 'people',
  },
  {
    icon: <MaterialIcon hasRipple icon="bubble_chart" initRipple={null}/>,
    label: 'Roles',
    value: 'roles',
  },
  {
    icon: <MaterialIcon hasRipple icon="spa" initRipple={null}/>,
    label: 'Requests',
    value: 'requests',
  },
];
