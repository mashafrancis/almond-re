// third party libraries
import {UserDetails} from '@modules/user/interfaces';

import {AnyAction} from 'redux';

// thunk action creators
import { displaySnackMessage } from '../snack';

// interfaces
import {
  GetAllPeopleActionFailure,
  GetAllPeopleActionRequest,
  GetAllPeopleActionSuccess,
  UpdatePersonFailure,
  UpdatePersonSuccess,
} from './interfaces';

// types
import {
  GET_ALL_PEOPLE_FAILURE,
  GET_ALL_PEOPLE_REQUEST,
  GET_ALL_PEOPLE_SUCCESS,
  UPDATE_PERSON_DETAILS_FAILURE,
  UPDATE_PERSON_DETAILS_SUCCESS,
} from './types';

import {
  loadingError,
  loadingRequest,
  loadingSuccess
} from '@modules/loading';
import {Action, ErrorObject} from '../../../shared.interfaces';

/**
 * Get all users action creator
 * @returns {GetAllPeopleActionRequest}
 */
export const getAllPeopleRequest = (): GetAllPeopleActionRequest => ({
  type: GET_ALL_PEOPLE_REQUEST,
  isLoading: true,
});

/**
 * Get userDetails success action creator
 * @returns {GetAllPeopleActionSuccess}
 */
export const getAllPeopleSuccess = (people: UserDetails[]): GetAllPeopleActionSuccess => ({
  people,
  type: GET_ALL_PEOPLE_SUCCESS,
  isLoading: false,
});

/**
 * Get all users action creator
 * @returns {GetAllPeopleActionFailure}
 */
export const getAllPeopleFailure = (errors: any): GetAllPeopleActionFailure => ({
  errors,
  type: GET_ALL_PEOPLE_FAILURE,
  isLoading: false,
});

/**
 * Update user details
 * @returns {UpdatePersonSuccess}
 */
export const updatePersonSuccess = (person: UserDetails): UpdatePersonSuccess => ({
  person,
  type: UPDATE_PERSON_DETAILS_SUCCESS,
});

export const updatePersonFailure = (errors: any): UpdatePersonFailure => ({
  errors,
  type: UPDATE_PERSON_DETAILS_FAILURE,
  isLoading: false,
});

export const getAllPeople = () => (
  dispatch: any,
  getState: any,
  http: { get: (arg0: string) => Promise<{ data: { data: UserDetails[]; }; }>; }
) => {
  // dispatch(getAllPeopleRequest());
  dispatch(loadingRequest('requesting'))
  return http.get('people')
    .then((response: { data: { data: UserDetails[]; }; }) => {
      dispatch(getAllPeopleSuccess(response.data.data));
      dispatch(loadingSuccess('success'));
    })
    .catch((error: ErrorObject) => {
      const {message} = error.response.data;
      dispatch(getAllPeopleFailure(message));
      dispatch(loadingError('error'))
      dispatch(displaySnackMessage('Failed to fetch your all users. Kindly reload the page.'));
    });
};

/**
 * Update user details
 * @returns {Function}
 * @param personId
 * @param personDetails
 */
export const updatePerson = (personId: string, personDetails: any): Function => (
  dispatch: any,
  getState: any,
  http: { patch: (arg0: string, arg1: any) => Promise<{ data: { data: UserDetails; message: string; }; }>; }
) => {
  http.patch(`people/${personId}`, personDetails)
    .then((response: { data: { data: UserDetails; message: string; }; }) => {
      dispatch(updatePersonSuccess(response.data.data));
      dispatch(displaySnackMessage(response.data.message));
    })
    .catch((error: ErrorObject) => {
      const {message} = error.response.data;
      dispatch(updatePersonFailure(message));
      dispatch(displaySnackMessage(message));
    });
}

const peopleInitialState = {
  people: [],
};

/**
 * Updates the user state in the application
 * @param {Object} state
 * @param {AnyAction} action
 * @returns {Object} state
 */
export const reducer = (state: {
  people: UserDetails[]
} = peopleInitialState, action: Action) => {
  switch (action.type) {
    case GET_ALL_PEOPLE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case GET_ALL_PEOPLE_SUCCESS:
      return {
        ...state,
        people: action.people,
        errors: null,
        isLoading: action.isLoading,
      };
    case GET_ALL_PEOPLE_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: action.isLoading,
      };
    case UPDATE_PERSON_DETAILS_SUCCESS:
      return {
        ...state,
        people: [...state.people].map(person => person._id === action.person._id ? {
          ...person,
          ...action.person,
        } : person),
      };
    case UPDATE_PERSON_DETAILS_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export default reducer;
