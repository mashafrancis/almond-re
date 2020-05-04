import * as React from 'react';

const selectedIndex = JSON.parse(window.localStorage.getItem('selectedIndex') ?? '{}');

export const MenuContext = React.createContext({
  isMenuOpen: false,
  selectedIndex: {
    group: selectedIndex === null || undefined || false ? 0 : selectedIndex.group,
    item: selectedIndex === null || undefined || false ? 0 : selectedIndex.item,
  },
  setOpen: (_open: boolean) => {},
  setSelectedIndex: (_selectedIndex: {group: number, item: number}) => {},
  logoutUser: () => {},
  setDeviceModalOpen: (_open: boolean) => {},
});

export const UserContext = React.createContext({
  _id: '',
  name: '',
  email: '',
  photo: '',
  isVerified: true,
  devices: [{
    _id: '',
    id: '',
    verified: false,
    isEnabled: false,
  }],
  activeDevice: {
    id: '',
    _id: '',
  },
  isAdmin: false,
});

