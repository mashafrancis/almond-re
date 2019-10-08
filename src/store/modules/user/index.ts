import * as firebase from '../../../utils/firebase';

// third party libraries
import { Action, AnyAction } from 'redux';

// thunk action creators
import { displaySnackMessage } from '../snack';

// interfaces
import {
  EditUserDetailsSuccess,
  GetAllUsersSuccess,
  GetUserDetailsActionSuccess,
  UserDetails,
} from './interfaces';

// helper functions
import { authService } from '../../../utils/auth';

// types
import {
  EDIT_USER_DETAILS_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  GET_USER_DETAILS_SUCCESS,
  LOG_OUT_USER,
} from './types';

/**
 * Get userDetails success action creator
 *
 * @returns {GetUserDetailsActionSuccess}
 */
export const getUserDetailsSuccess = (user: any): GetUserDetailsActionSuccess => {
  return { user, type: GET_USER_DETAILS_SUCCESS };
};

/**
 * Get userDetails success action creator
 *
 * @returns {GetAllUsersSuccess}
 */
export const getAllUsersSuccess = (users: UserDetails[]): GetAllUsersSuccess => {
  return { users, type: GET_ALL_USERS_SUCCESS };
};

/**
 * Edit user center success action creator
 *
 * @returns {EditUserDetailsSuccess}
 */
export const editUserDetailsSuccess = (userDetails: UserDetails): EditUserDetailsSuccess => {
  return { userDetails, type: EDIT_USER_DETAILS_SUCCESS };
};

/**
 * Log-out user action
 *
 * @returns {Action}
 */
export const logoutUserAction = (): Action => ({ type: LOG_OUT_USER });

/**
 * Gets user details
 *
 *
 * @returns {Function}
 */
export const getUserDetails = userId => (dispatch, getState, http) => {
  return firebase.firebaseDatabase.ref('users')
    .orderByChild('email')
    .equalTo(userId)
    .on('value', (snapshot) => {
      const data = Object.values(snapshot.val());
      dispatch(getUserDetailsSuccess(data[0]));
      return data;
    });
};

export const getAllUsers = () => (dispatch, getState, http) => {
  return http.get('user.json')
    .then((response) => {
      dispatch(getAllUsersSuccess(response.data));
      return response.data;
    });
};

/**
 * Edits user center details
 *
 * @param {string} userId
 *
 * @returns {Function}
 */
export const editUserDetails = userId => (dispatch, getState, http) => {
  return http.patch(`users/${userId}`)
    .then((response) => {
      return dispatch(editUserDetailsSuccess(response.data.data.center));
    })
    .catch((error) => {
      return dispatch(displaySnackMessage(error.message));
    });
};

/**
 * Log-out user action creator
 *
 * @returns {Function}
 */
export const logoutUser = () => (dispatch) => {
  authService.logoutUser();
  dispatch(logoutUserAction());
};

const userInitialState = {
  user: {},
  users: [],
};

/**
 * Updates the user state in the application
 *
 * @param {Object} state
 * @param {AnyAction} action
 *
 * @returns {Object} state
 */
export const reducer = (state = userInitialState, action: AnyAction) => {
  switch (action.type) {
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case EDIT_USER_DETAILS_SUCCESS:
      return {
        ...state,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
};

export default reducer;
