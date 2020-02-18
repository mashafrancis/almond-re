// react libraries
import * as React from 'react';

// third party packages
import { Redirect, Route, Switch } from 'react-router-dom';

// pages
import { WaterCyclesPage } from '@pages/WaterCyclesPage';

export const Menus = [
  {
    navLink: '/analytics',
    icon: 'widgets',
    primaryText: 'Analytics',
    component: WaterCyclesPage,
  },
  {
    navLink: '/water-cycles',
    icon: 'opacity',
    primaryText: 'Water Cycles',
    component: WaterCyclesPage,
  },
  {
    navLink: '/environmental-control',
    icon: 'control_camera',
    primaryText: 'Environmental Control',
    component: WaterCyclesPage,
  },
  {
    navLink: '/quality-control',
    icon: 'security',
    primaryText: 'Quality Control',
    component: WaterCyclesPage,
  },
  {
    navLink: '/energy-usage',
    icon: 'toys',
    primaryText: 'Energy Usage',
    component: WaterCyclesPage,
  },
  {
    navLink: '/maintenance',
    icon: 'local_florist',
    primaryText: 'Maintenance Schedule',
    component: WaterCyclesPage,
  },
];
