import { UserDetails } from '@modules/user/interfaces';

export type State = {
	user: UserDetails;
	isLoading: boolean;
	errors: null;
};

export const CREATE_ACCOUNT_REQUEST = 'almond/auth/CREATE_ACCOUNT_REQUEST';
export type CREATE_ACCOUNT_REQUEST = typeof CREATE_ACCOUNT_REQUEST;

export const CREATE_ACCOUNT_SUCCESS = 'almond/auth/CREATE_ACCOUNT_SUCCESS';
export type CREATE_ACCOUNT_SUCCESS = typeof CREATE_ACCOUNT_SUCCESS;

export const CREATE_ACCOUNT_FAILURE = 'almond/auth/CREATE_ACCOUNT_FAILURE';
export type CREATE_ACCOUNT_FAILURE = typeof CREATE_ACCOUNT_FAILURE;

export const LOGIN_REQUEST = 'almond/auth/LOGIN_REQUEST';
export type LOGIN_REQUEST = typeof LOGIN_REQUEST;

export const LOGIN_SUCCESS = 'almond/auth/ADD_SCHEDULES_SUCCESS';
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;

export const LOGIN_FAILURE = 'almond/auth/LOGIN_FAILURE';
export type LOGIN_FAILURE = typeof LOGIN_FAILURE;
