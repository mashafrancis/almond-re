import { Location } from 'history';

export interface AppProps {
  location: Location;
  serverError: { error: boolean };
}

export interface AppState {
}
