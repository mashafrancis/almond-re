import { Location } from 'history';
import { UserDetails } from '../store/modules/user/interfaces';

export interface AppProps {
  location: Location;
  serverError: { error: boolean };
  user: UserDetails;
  users: any;
  getUserDetails: (userId) => Promise<any>;
  getAllUsers: () => Promise<any>;
}

export interface AppState {
  isGettingUserDetails: boolean;
  isUserAuthenticated: boolean;
  users: UserDetails[];
}
