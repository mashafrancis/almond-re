import { Location } from 'history';
import { UserDetails } from 'modules/user/interfaces';

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
}
