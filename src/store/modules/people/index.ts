// third party libraries
import { UserDetails } from '@modules/user/interfaces';

import { AnyAction } from 'redux';

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

/**
 * Get all users action creator
 *
 * @returns {GetAllPeopleActionRequest}
 */
export const getAllPeopleRequest = (): GetAllPeopleActionRequest => ({
  type: GET_ALL_PEOPLE_REQUEST,
  isLoading: true,
});

/**
 * Get userDetails success action creator
 *
 * @returns {GetAllPeopleActionSuccess}
 */
export const getAllPeopleSuccess = (people: UserDetails[]): GetAllPeopleActionSuccess => ({
  people,
  type: GET_ALL_PEOPLE_SUCCESS,
  isLoading: false,
});

/**
 * Get all users action creator
 *
 * @returns {GetAllPeopleActionFailure}
 */
export const getAllPeopleFailure = (errors): GetAllPeopleActionFailure => ({
  errors,
  type: GET_ALL_PEOPLE_FAILURE,
  isLoading: false,
});

/**
 * Update user details
 *
 * @returns {UpdatePersonSuccess}
 */
export const updatePersonSuccess = (person: UserDetails): UpdatePersonSuccess => ({
  person,
  type: UPDATE_PERSON_DETAILS_SUCCESS,
});

export const updatePersonFailure = (errors): UpdatePersonFailure => ({
  errors,
  type: UPDATE_PERSON_DETAILS_FAILURE,
  isLoading: false,
});

export const getAllPeople = () => (dispatch, getState, http) => {
  dispatch(getAllPeopleRequest());
  return http.get('people')
    .then((response) => {
      dispatch(getAllPeopleSuccess(response.data.data));
    })
    .catch((error) => {
      const message = error.response.data.message;
      dispatch(getAllPeopleFailure(message));
      dispatch(displaySnackMessage('Failed to fetch your all users. Kindly reload the page.'));
    });
};

/**
 * Update user details
 *
 * @returns {Function}
 * @param personId
 * @param personDetails
 */
export const updatePerson = (personId, personDetails) => (dispatch, getState, http) => {
  return http.patch(`people/${personId}`, personDetails)
    .then((response) => {
      dispatch(updatePersonSuccess(response.data.data));
      dispatch(displaySnackMessage(response.data.message));
    })
    .catch((error) => {
      dispatch(updatePersonFailure(error.message));
      dispatch(displaySnackMessage(error.message));
    });
};

const peopleInitialState = {
  people: [],
};

/**
 * Updates the user state in the application
 *
 * @param {Object} state
 * @param {AnyAction} action
 *
 * @returns {Object} state
 */
export const reducer = (state = peopleInitialState, action: AnyAction) => {
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
        people: [...state.people].map(person => person._id === action.person._id ? ({
          ...person,
          ...action.person,
        }) : person),
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
