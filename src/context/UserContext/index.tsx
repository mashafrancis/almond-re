import React, { createContext } from 'react';

export const UserContext = createContext({
  _id: '',
  name: '',
  email: '',
  photo: '',
  isVerified: true,
  devices: [{
    _id: '',
    id: '',
    verified: false,
    enabled: false,
  }],
  activeDevice: {
    id: '',
    _id: '',
  },
  isAdmin: false,
});
