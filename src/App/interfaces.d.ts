import { Location } from 'history';
import { UserDetails } from '../store/modules/user/interfaces';

export interface AppProps {
  location: Location;
  serverError: { error: boolean };
  user: UserDetails;
  getUserDetails: (userId: string) => Promise<any>;
}

export interface AppState {
  isGettingUserDetails: boolean;
  isUserAuthenticated: boolean;
}
