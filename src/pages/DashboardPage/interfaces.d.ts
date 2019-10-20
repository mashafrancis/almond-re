import { UserDetails } from 'modules/user/interfaces';

export interface DashboardPageProps {
  drawerEl?: object;
  match?: {
    url: string;
  };
  component: any;
  user?: UserDetails;
  logoutUser?: () => void;
}

export interface DashboardPageState {
  isDrawerOpen: boolean;
  selectedIndex: number;
}
