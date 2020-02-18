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
}

export interface DashboardContainerState {
  isOpen: boolean;
  isMenuOpen: boolean;
  selectedIndex: number;
  isLoading: boolean;
  isFeedbackMenuOpen: boolean;
  isFeedbackModal: boolean;
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
