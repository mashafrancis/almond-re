import {
	CREATE_ACCOUNT_FAILURE,
	CREATE_ACCOUNT_REQUEST,
	CREATE_ACCOUNT_SUCCESS,
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
} from '@modules/authentication/types';
import { UserDetails } from '@modules/user/interfaces';
import { ErrorObject } from '../../../shared.interfaces';

export interface CreateAccountActionRequest {
	type: CREATE_ACCOUNT_REQUEST;
	isLoading: boolean;
}

export interface CreateAccountActionSuccess {
	type: CREATE_ACCOUNT_SUCCESS;
	isLoading: boolean;
}

export interface CreateAccountActionFailure {
	type: CREATE_ACCOUNT_FAILURE;
	isLoading: boolean;
	errors: ErrorObject | null;
}

export interface LoginActionRequest {
	type: LOGIN_REQUEST;
	isLoading: boolean;
}

export interface LoginActionSuccess {
	type: LOGIN_SUCCESS;
	isLoading: boolean;
	user: UserDetails;
}

export interface LoginActionFailure {
	type: LOGIN_FAILURE;
	isLoading: boolean;
	errors: ErrorObject | null;
}

export interface IUserInputDTO {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
