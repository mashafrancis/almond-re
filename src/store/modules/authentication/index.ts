import {
	CreateAccountActionFailure,
	CreateAccountActionRequest,
	CreateAccountActionSuccess,
	IUserInputDTO,
	LoginActionFailure,
	LoginActionRequest,
	LoginActionSuccess,
} from '@modules/authentication/interfaces';
import {
	CREATE_ACCOUNT_FAILURE,
	CREATE_ACCOUNT_REQUEST,
	CREATE_ACCOUNT_SUCCESS,
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	State,
} from '@modules/authentication/types';
import { UserDetails } from '@modules/user/interfaces';
import { Action, AnyAction, Dispatch, Reducer } from 'redux';
import { displaySnackMessage } from '@modules/snack';
import errorOnSnack from '@utils/errorOnSnack';
import authService from '@utils/auth';
import { ErrorObject } from '../../../shared.interfaces';

/**
 * Create account request
 * @returns {CreateAccountActionRequest}
 */
export const createAccountRequest = (): CreateAccountActionRequest => ({
	type: CREATE_ACCOUNT_REQUEST,
	isLoading: true,
});

/**
 * Create account success
 * @returns {CreateAccountActionSuccess}
 */
export const createAccountSuccess = (): CreateAccountActionSuccess => ({
	type: CREATE_ACCOUNT_SUCCESS,
	isLoading: false,
});

/**
 * Create account failure
 * @returns {CreateAccountActionFailure}
 */
export const createAccountFailure = (
	errors: ErrorObject,
): CreateAccountActionFailure => ({
	errors,
	type: CREATE_ACCOUNT_FAILURE,
	isLoading: false,
});

/**
 * Login account request
 * @returns {LoginActionRequest}
 */
export const loginAccountRequest = (): LoginActionRequest => ({
	type: LOGIN_REQUEST,
	isLoading: true,
});

/**
 * Login account success
 * @returns {LoginActionSuccess}
 */
export const loginAccountSuccess = (user: UserDetails): LoginActionSuccess => ({
	user,
	type: LOGIN_SUCCESS,
	isLoading: false,
});

export const loginAccountFailure = (
	errors: ErrorObject,
): LoginActionFailure => ({
	errors,
	type: LOGIN_FAILURE,
	isLoading: false,
});

export const createAccount = (user: IUserInputDTO) => (
	dispatch: Dispatch,
	getState: any,
	http: any,
) => {
	dispatch(createAccountRequest());
	return http
		.post('auth/register', user)
		.then((response: { data: any }) => {
			const {
				data: { message },
			} = response;
			dispatch(createAccountSuccess());
			dispatch(displaySnackMessage(message));
			window.location.replace('/register-success');
		})
		.catch((error) => {
			dispatch(createAccountFailure(error.message));
			errorOnSnack(
				error,
				dispatch,
				'creating your new account. Kindly try again.',
			);
		});
};

export const loginAccount = (user: Partial<IUserInputDTO>) => (
	dispatch: Dispatch,
	getState: any,
	http: any,
) => {
	dispatch(loginAccountRequest());
	return http
		.post('auth/login', user)
		.then((response: { data: any }) => {
			const {
				data: { data, message },
			} = response;
			authService.saveToken(data.token.accessToken);
			dispatch(loginAccountSuccess(data.user));
			dispatch(displaySnackMessage(message));
			window.location.replace('/');
		})
		.catch((error) => {
			dispatch(loginAccountFailure(error.message));
			errorOnSnack(
				error,
				dispatch,
				'login in to your account. Kindly try again.',
			);
		});
};

export const userAccountInitialState = {
	user: {} as any,
	isLoading: false,
	errors: null,
};

export const reducer: Reducer<State, Action> = (
	state: State = userAccountInitialState,
	action: AnyAction,
) => {
	switch (action.type) {
		case CREATE_ACCOUNT_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case CREATE_ACCOUNT_SUCCESS:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case CREATE_ACCOUNT_FAILURE:
			return {
				...state,
				isLoading: action.isLoading,
				errors: action.errors,
			};
		case LOGIN_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoading: action.isLoading,
				user: action.user,
			};
		case LOGIN_FAILURE:
			return {
				...state,
				isLoading: action.isLoading,
				errors: action.errors,
			};
		default:
			return state;
	}
};

export default reducer;
