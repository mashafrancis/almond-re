import React, { ReactNode } from 'react';

export interface MenuContextProps {
  children: ReactNode
}

export interface MenuContextState {
  isOpen: boolean;
  isMenuOpen: boolean;
  selectedIndex: {
    group: number;
    item: number
  };
  isSelectDeviceModalOpen: boolean;
  isActivityDrawerOpen: boolean;
  activityLogsViewed: boolean;
}
