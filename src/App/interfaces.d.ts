import { UserDetails } from '@modules/user/interfaces';
import { Location } from 'history';
import { SnackMessage } from '@modules/snack/interfaces';

export interface AppProps {
	location: Location;
	user: UserDetails;
	snack: SnackMessage;
	loading: string;
}

export interface AppState {
	isUserAuthenticated: boolean;
	loading: string;
	isAdmin: boolean;
}
