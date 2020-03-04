import { UserDetails } from '@modules/user/interfaces';
import { Location } from 'history';

export interface AppProps {
  location: Location;
  serverError: { error: boolean };
  user: UserDetails;
  users: any;
  getUserDetails: () => Promise<any>;
  getAllUsers: () => Promise<any>;
  isFetchingUserDetails: boolean;
}

export interface AppState {
  isUserAuthenticated: boolean;
  isFetchingUserDetails: boolean;
  isAdmin: boolean;
}
