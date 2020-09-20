import * as React from 'react';
import { UserDetails } from '@modules/user/interfaces';

export interface UserContextProps {
	user: UserDetails;
	getUserDetails: () => Promise<any>;
	children: React.ReactNode;
}
