import { UserDetails } from '@modules/user/interfaces';

export interface DashboardContainerProps {
  drawerEl?: object;
  match?: {
    url: string;
  };
  component?: any;
  user?: UserDetails;
  logoutUser?: () => void;
  title: string;
  activateDevice?: (id) => Promise<any>;
  getUserDetails: () => Promise<any>;
  activeDevice: {
    id: string;
    _id: string;
    verified?: boolean;
    user?: UserDetails;
  };
}

export interface DashboardContainerState {
  isOpen: boolean;
  isMenuOpen: boolean;
  selectedIndex: number;
  isLoading: boolean;
  isFeedbackMenuOpen: boolean;
  isFeedbackModal: boolean;
  isSelectDeviceModalOpen: boolean;
  device: string;
  activeDevice: {
    id: string;
    _id: string;
  };
  action: string;
  feedback: '';
  menu: {
    isOpen: boolean;
    selectedIndex: number;
  };
  fields: {
    [key: string]: string | number
  };
}
