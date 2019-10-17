import { Location } from 'history';
import { UserDetails } from '../store/modules/user/interfaces';

export interface AppProps {
  location: Location;
  serverError: { error: boolean };
  user: UserDetails;
  users: any;
  getUserDetails: any;
  getAllUsers: () => Promise<any>;
  isGettingUserDetails: boolean;
}

export interface AppState {
  isUserAuthenticated: boolean;
  users: UserDetails[];
}
