import { UserDetails } from '@modules/user/interfaces';
import { History } from 'history';

export interface EnterDeviceIdPageProps {
  verifyUserDevice: (id) => Promise<any>;
  displaySnackMessage?: (message) => Promise<any>;
  error?: object;
  isLoading: boolean;
  history: History;
  getUserDetails: () => Promise<any>;
  user?: UserDetails;
}

export interface EnterDeviceIdPageState {
  isLoading: boolean;
}
