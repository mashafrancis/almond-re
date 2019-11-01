import * as React from 'react';

export const MenuContext = React.createContext({
  isOpen: false,
  selectedIndex: 0,
  setOpen: (_open: boolean) => {},
  setSelectedIndex: (_selectedIndex: number) => {},
  logoutUser: () => null,
});

export const UserContext = React.createContext({
  name: '',
  photo: '',
});

export const ScheduleTableContext = React.createContext({
  schedules: [],
  ActionButtons: (_schedule: {}) => {},
  handleToggleStatusChange: (_event: any, _schedule: {}) => {},
  statusClass: '',
});
