import * as React from 'react';

import MaterialIcon from '@material/react-material-icon';

// pages
import AnalyticsPage from '@pages/AnalyticsPage';
import DeviceManagementPage from '@pages/DeviceManagementPage';
import EnergyMonitoringPage from '@pages/EnergyMonitoringPage';
import EnvironmentControlPage from '@pages/EnvironmentControlPage';
import QualityCheckPage from '@pages/QualityCheckPage';
import UserRolesPage from '@pages/UserRolesPage';
import WaterCyclesPage from '@pages/WaterCyclesPage';

// interfaces
import { MenuBottomProps, MenuComponentProps } from '@components/MenuRoutes/interfaces';

export const Menus: MenuComponentProps[][] = [
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
      component: UserRolesPage,
    },
    {
      icon: 'local_florist',
      primaryText: 'Maintenance Schedule',
      component: DeviceManagementPage,
    },
  ],
  [
    {
      icon: 'settings',
      primaryText: 'Settings',
      component: WaterCyclesPage,
    },
    {
      icon: 'help',
      primaryText: 'Help',
      component: WaterCyclesPage,
    },
    {
      icon: 'open_in_new',
      primaryText: 'Send feedback',
      component: UserRolesPage,
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
