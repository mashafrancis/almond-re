// third party libraries
import { UserDetails } from '@modules/user/interfaces';

import { AnyAction } from 'redux';

// thunk action creators
import { loadingError, loadingRequest, loadingSuccess } from '@modules/loading';
import { displaySnackMessage } from '../snack';

// interfaces
import {
	GetAllPeopleActionFailure,
	GetAllPeopleActionSuccess,
	UpdatePersonFailure,
	UpdatePersonSuccess,
} from './interfaces';

// types
import {
	GET_ALL_PEOPLE_FAILURE,
	GET_ALL_PEOPLE_SUCCESS,
	UPDATE_PERSON_DETAILS_FAILURE,
	UPDATE_PERSON_DETAILS_SUCCESS,
} from './types';

import { Action, ErrorObject } from '../../../shared.interfaces';

/**
 * Get userDetails success action creator
 * @returns {GetAllPeopleActionSuccess}
 */
export const getAllPeopleSuccess = (
	people: UserDetails[],
): GetAllPeopleActionSuccess => ({
	people,
	type: GET_ALL_PEOPLE_SUCCESS,
});

/**
 * Get all users action creator
 * @returns {GetAllPeopleActionFailure}
 */
export const getAllPeopleFailure = (
	errors: any,
): GetAllPeopleActionFailure => ({
	errors,
	type: GET_ALL_PEOPLE_FAILURE,
});

/**
 * Update user details
 * @returns {UpdatePersonSuccess}
 */
export const updatePersonSuccess = (
	person: UserDetails,
): UpdatePersonSuccess => ({
	person,
	type: UPDATE_PERSON_DETAILS_SUCCESS,
});

export const updatePersonFailure = (errors: any): UpdatePersonFailure => ({
	errors,
	type: UPDATE_PERSON_DETAILS_FAILURE,
});

export const getAllPeople = () => (
	dispatch: any,
	getState: any,
	http: { get: (arg0: string) => Promise<{ data: { data: UserDetails[] } }> },
) => {
	dispatch(loadingRequest('requesting'));
	return http
		.get('people')
		.then((response: { data: { data: UserDetails[] } }) => {
			dispatch(getAllPeopleSuccess(response.data.data));
			dispatch(loadingSuccess('success'));
		})
		.catch((error: ErrorObject) => {
			dispatch(getAllPeopleFailure(error));
			dispatch(loadingError('error'));
			dispatch(
				displaySnackMessage(
					'Failed to fetch your all users. Kindly reload the page.',
				),
			);
		});
};

/**
 * Update user details
 * @returns {Function}
 * @param personId
 * @param personDetails
 */
export const updatePerson = (
	personId: string,
	personDetails: any,
): Function => (
	dispatch: any,
	getState: any,
	http: {
		patch: (
			arg0: string,
			arg1: any,
		) => Promise<{ data: { data: UserDetails; message: string } }>;
	},
) => {
	dispatch(loadingRequest('requesting'));
	return http
		.patch(`people/${personId}`, personDetails)
		.then((response: { data: { data: UserDetails; message: string } }) => {
			const {
				data: { data, message },
			} = response;
			dispatch(updatePersonSuccess(data));
			dispatch(loadingSuccess('success'));
			dispatch(displaySnackMessage(message));
		})
		.catch((error: ErrorObject) => {
			const { message } = error.response.data;
			dispatch(updatePersonFailure(error));
			dispatch(loadingError('error'));
			dispatch(displaySnackMessage(message));
		});
};

export const peopleInitialState = {
	people: [],
	errors: null,
};

/**
 * Updates the user state in the application
 * @param {Object} state
 * @param {AnyAction} action
 * @returns {Object} state
 */
export const reducer = (
	state: {
		people: UserDetails[];
		errors: null;
	} = peopleInitialState,
	action: Action,
) => {
	switch (action.type) {
		case GET_ALL_PEOPLE_SUCCESS:
			return {
				...state,
				people: action.people,
				errors: null,
			};
		case GET_ALL_PEOPLE_FAILURE:
			return {
				...state,
				errors: action.errors,
			};
		case UPDATE_PERSON_DETAILS_SUCCESS:
			return {
				...state,
				people: [...state.people].map((person) =>
					person._id === action.person._id
						? {
								...person,
								...action.person,
						  }
						: person,
				),
				errors: null,
			};
		case UPDATE_PERSON_DETAILS_FAILURE:
			return {
				...state,
				errors: action.errors,
			};
		default:
			return state;
	}
};

export default reducer;
