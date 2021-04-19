import { ResourceAccessLevel } from '@modules/userRoles/interfaces';
import { FormattedPermissions } from '@utils/FormatPermissions/interfaces';
import {
	EDIT_USER_DETAILS_FAILURE,
	EDIT_USER_DETAILS_SUCCESS,
	GET_USER_DETAILS_FAILURE,
	GET_USER_DETAILS_SUCCESS,
} from './types';
import { ErrorObject } from '../../../shared.interfaces';

export interface GetUserDetailsActionSuccess {
	userDetails: UserDetails;
	type: GET_USER_DETAILS_SUCCESS;
}

export interface GetUserDetailsActionFailure {
	type: GET_USER_DETAILS_FAILURE;
	errors: ErrorObject | null;
}

export interface EditUserDetailsSuccess {
	userDetails: UserDetails;
	type: EDIT_USER_DETAILS_SUCCESS;
}

export interface EditUserDetailsFailure {
	errors: ErrorObject | null;
	type: EDIT_USER_DETAILS_FAILURE;
}

export interface UserDetails {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	photo: string;
	isVerified: boolean;
	devices: Device[] | UserDevice[] | any;
	activeDevice: string | Device | any;
	roles: CurrentRole[] | Role[];
	permissions?: FormattedPermissions;
	currentRole: CurrentRole;
	createdAt?: string;
	updatedAt?: string;
}

export interface UserDevice {
	_id: string;
	id: string;
}

export interface Device extends UserDevice {
	verified: boolean;
	enabled: boolean;
	user: string;
	updatedAt: string;
}

export interface CurrentRole {
	_id: string;
	title: string;
}

export interface Role extends CurrentRole {
	description: string;
	resourceAccessLevels: ResourceAccessLevel[];
}
