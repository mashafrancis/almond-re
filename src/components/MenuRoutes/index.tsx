import * as React from 'react';

import WidgetsRoundedIcon from '@material-ui/icons/WidgetsRounded';
import OpacityIcon from '@material-ui/icons/Opacity';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import SecurityIcon from '@material-ui/icons/Security';
import MemoryIcon from '@material-ui/icons/Memory';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AllOutIcon from '@material-ui/icons/AllOut';
import PeopleIcon from '@material-ui/icons/People';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import SpaIcon from '@material-ui/icons/Spa';

// pages
import AnalyticsPage from '@pages/AnalyticsPage';
import DeviceManagementPage from '@pages/DeviceManagementPage';
import EnergyMonitoringPage from '@pages/EnergyMonitoringPage';
import EnvironmentControlPage from '@pages/EnvironmentControlPage';
import HelpPage from "@pages/HelpPage";
import PeoplePage from '@pages/PeoplePage';
import QualityCheckPage from '@pages/QualityCheckPage';
import SettingsPage from '@pages/SettingsPage';
import SupportPage from "@pages/SupportPage";
import UserRolesPage from '@pages/UserRolesPage';
import WaterCyclesPage from '@pages/WaterCyclesPage';

// interfaces
import { MenuBottomProps, MenuComponentProps } from '@components/MenuRoutes/interfaces';

export const UserMenus: MenuComponentProps[][] = [
  [
    {
      icon: <WidgetsRoundedIcon />,
      primaryText: 'Analytics',
      component: AnalyticsPage,
    },
    {
      icon: <OpacityIcon />,
      primaryText: 'Water Cycles',
      component: WaterCyclesPage,
    },
    {
      icon: <ControlCameraIcon />,
      primaryText: 'Environmental Control',
      component: EnvironmentControlPage,
    },
    {
      icon: <SecurityIcon />,
      primaryText: 'Quality Control',
      component: QualityCheckPage,
    },
    {
      icon: <MemoryIcon />,
      primaryText: 'Energy Usage',
      component: EnergyMonitoringPage,
    },
    {
      icon: <LocalFloristIcon />,
      primaryText: 'Support',
      component: SupportPage,
    },
  ],
  [
    {
      icon: <SettingsIcon />,
      primaryText: 'Settings',
      component: SettingsPage,
    },
    {
      icon: <HelpIcon />,
      primaryText: 'Help',
      component: HelpPage,
    },
    {
      icon: <OpenInNewIcon />,
      primaryText: 'Send feedback',
      component: AnalyticsPage,
    },
  ],
];

export const AdminMenus: MenuComponentProps[][] = [
  [
    {
      icon: <WidgetsRoundedIcon />,
      primaryText: 'Analytics',
      component: AnalyticsPage,
    },
    {
      icon: <AllOutIcon />,
      primaryText: 'Devices',
      component: DeviceManagementPage,
    },
    {
      icon: <PeopleIcon />,
      primaryText: 'People',
      component: PeoplePage,
    },
    {
      icon: <BubbleChartIcon />,
      primaryText: 'Roles',
      component: UserRolesPage,
    },
    {
      icon: <SpaIcon />,
      primaryText: 'Support',
      component: SupportPage,
    },
  ],
  [
    {
      icon: <SettingsIcon />,
      primaryText: 'Settings',
      component: PeoplePage,
    },
    {
      icon: <HelpIcon />,
      primaryText: 'Help',
      component: HelpPage,
    },
  ],
];

export const BottomNavigationMenus: MenuBottomProps[] = [
  {
    icon: <WidgetsRoundedIcon />,
    label: 'Analytics',
    value: 'analytics',
  },
  {
    icon: <OpacityIcon />,
    label: 'Water',
    value: 'water',
  },
  {
    icon: <ControlCameraIcon />,
    label: 'Environmental',
    value: 'environment',
  },
  {
    icon: <SecurityIcon />,
    label: 'Quality',
    value: 'quality',
  },
  {
    icon: <MemoryIcon />,
    label: 'Energy',
    value: 'energy',
  },
];

export const AdminBottomNavigationMenus: MenuBottomProps[] = [
  {
    icon: <WidgetsRoundedIcon />,
    label: 'Analytics',
    value: 'analytics',
  },
  {
    icon: <AllOutIcon />,
    label: 'Devices',
    value: 'devices',
  },
  {
    icon: <OpenInNewIcon />,
    label: 'People',
    value: 'people',
  },
  {
    icon: <BubbleChartIcon />,
    label: 'Roles',
    value: 'roles',
  },
  {
    icon: <SpaIcon />,
    label: 'Requests',
    value: 'requests',
  },
];
