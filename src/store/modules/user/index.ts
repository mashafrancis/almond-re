// third party libraries
import { Action, AnyAction } from 'redux';

// thunk action creators
import { displaySnackMessage } from '../snack';

// interfaces
import {
  EditUserDetailsFailure,
  EditUserDetailsSuccess,
  GetUserDetailsActionFailure,
  GetUserDetailsActionSuccess,
  UserDetails,
} from './interfaces';

// helper functions
import { authService } from '@utils/auth';
import formatPermissions from '@utils/helpers/formatPermissions';

// types
import {
  EDIT_USER_DETAILS_FAILURE,
  EDIT_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  LOG_OUT_USER,
} from './types';

import {
  loadingError,
  loadingRequest,
  loadingSuccess,
} from '@modules/loading';

import { ErrorObject } from '../../../shared.interfaces';
import errorOnSnack from '@utils/helpers/errorOnSnack';

/**
 * Get userDetails success action creator
 * @returns {GetUserDetailsActionSuccess}
 */
export const getUserDetailsSuccess = (userDetails: UserDetails): GetUserDetailsActionSuccess => ({
  userDetails,
  type: GET_USER_DETAILS_SUCCESS,
});

/**
 * Get userDetails failure action creator
 * @returns {GetUserDetailsActionFailure}
 */
export const getUserDetailsFailure = (errors: any): GetUserDetailsActionFailure => ({
  errors,
  type: GET_USER_DETAILS_FAILURE,
});

/**
 * Edit user success action creator
 * @returns {EditUserDetailsSuccess}
 */
export const editUserDetailsSuccess = (userDetails: UserDetails): EditUserDetailsSuccess => ({
  userDetails,
  type: EDIT_USER_DETAILS_SUCCESS,
});

/**
 * Edit user failure action creator
 * @returns {EditUserDetailsFailure}
 */
export const editUserDetailsFailure = (errors: any): EditUserDetailsFailure => ({
  errors,
  type: EDIT_USER_DETAILS_FAILURE,
});

/**
 * Log-out user action
 * @returns {Action}
 */
export const logoutUserAction = (): Action => ({ type: LOG_OUT_USER });

/**
 * Gets user details
 * @returns {Function}
 */
export const getUserDetails = () => (
  dispatch: any,
  getState: any,
  http: { get: (arg0: string) => Promise<{ data: { data: UserDetails; }; }>; },
) => {
  dispatch(loadingRequest('requesting'));
  return http.get('me')
    .then((response: { data: { data: UserDetails; }; }) => {
      const { data } = response.data;
      dispatch(loadingSuccess('success'));
      return dispatch(getUserDetailsSuccess(data));
    })
    .catch((error: ErrorObject) => {
      dispatch(loadingError('error'));
      errorOnSnack(error, dispatch);
      dispatch(getUserDetailsFailure(error));
    });
};

/**
 * Edits user center details
 * @param {string} userId
 * @param userDetails
 * @returns {Function}
 */
export const editUserDetails = (userId: string, userDetails: any) => (
  dispatch: any,
  getState: any,
  http: { patch: (arg0: string, arg1: any) => Promise<{ data: { data: any; message: any; }; }>; },
) => {
  dispatch(loadingRequest('requesting'));
  return http.patch(`people/${userId}`, userDetails)
    .then((response: { data: { data: any; message: any; }; }) => {
      const { data, message } = response.data;
      dispatch(loadingSuccess('success'));
      dispatch(editUserDetailsSuccess(data));
      dispatch(displaySnackMessage(message));
    })
    .catch((error: ErrorObject) => {
      dispatch(loadingError('error'));
      errorOnSnack(error, dispatch, 'updating your details');
      dispatch(editUserDetailsFailure(error));
    });
};

/**
 * Log-out user action creator
 * @returns {Function}
 */
export const logoutUser = () => (dispatch: any) => {
  authService.logoutUser();
  dispatch(logoutUserAction());
};

export const userInitialState = {
  // ...authService.getUser().UserInfo,
  userDetails: {},
  permissions: {},
  errors: null,
};

/**
 * Updates the user state in the application
 * @param {Object} state
 * @param {AnyAction} action
 * @returns {Object} state
 */
export const reducer = (state = userInitialState, action: AnyAction) => {
  switch (action.type) {
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.userDetails,
        permissions: formatPermissions(action.userDetails.roles[0]),
      };
    case GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    case EDIT_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: { ...state.userDetails, ...action.userDetails },
      };
    case EDIT_USER_DETAILS_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default reducer;
