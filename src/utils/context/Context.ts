import * as React from 'react';

const selectedIndex = JSON.parse(window.localStorage.getItem('selectedIndex'));

export const MenuContext = React.createContext({
  isMenuOpen: false,
  selectedIndex: {
    group: selectedIndex === null || undefined || false ? 0 : selectedIndex.group,
    item: selectedIndex === null || undefined || false ? 0 : selectedIndex.item,
  },
  setOpen: (_open: boolean) => {},
  setSelectedIndex: (_selectedIndex: {group: number, item: number}) => {},
  logoutUser: () => null,
  setDeviceModalOpen: (_open: boolean) => {},
});

export const UserContext = React.createContext({
  id: '',
  name: '',
  email: '',
  photo: '',
  role: '',
  isVerified: true,
  devices: [],
  activeDevice: {
    id: '',
    _id: '',
  },
});

export const ScheduleTableContext = React.createContext({
  schedules: [],
  ActionButtons: (_schedule: {}) => {},
  handleToggleStatusChange: (_event: any, _schedule: {}) => {},
  statusClass: '',
});

export const ViewportContext = React.createContext({
  width: 0,
  height: 0,
});
