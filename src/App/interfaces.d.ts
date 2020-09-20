import { UserDetails } from '@modules/user/interfaces';
import { Location } from 'history';
import { SnackMessage } from '@modules/snack/interfaces';

export interface AppProps {
	location: Location;
	serverError: { error: boolean };
	user: UserDetails;
	users: any;
	getUserDetails: () => Promise<any>;
	getAllUsers: () => Promise<any>;
	loading: string;
	snack: SnackMessage;
}

export interface AppState {
	isUserAuthenticated: boolean;
	loading: string;
	isAdmin: boolean;
}
