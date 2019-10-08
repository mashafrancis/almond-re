import { UserDetails } from 'modules/user/interfaces';

export interface DashboardNavBarProps {
  drawerEl?: object;
  match?: {
    url: string;
  };
  component: any;
  user: UserDetails;
  logoutUser: () => void;
}

export interface DashboardNavBarState {
  isDrawerOpen: boolean;
  isMenuOpen: boolean;
  selectedIndex: number;
  isLoading: boolean;
}
