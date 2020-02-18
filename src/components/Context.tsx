import * as React from 'react';

export const MenuContext = React.createContext({
  isOpen: false,
  selectedIndex: 0,
  setOpen: (_open: boolean) => {},
  setSelectedIndex: (_selectedIndex: number) => {},
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

export const DeviceContext = React.createContext({
  controlledDevice: '',
});
