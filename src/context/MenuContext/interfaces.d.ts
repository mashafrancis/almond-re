import * as React from 'react';

export interface MenuContextProps {
  children: React.ReactNode
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
