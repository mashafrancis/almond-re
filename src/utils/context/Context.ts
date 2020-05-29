import * as React from 'react';

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

