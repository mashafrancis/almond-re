// third party libraries
import { Action, AnyAction } from 'redux';

// thunk action creators
import { displaySnackMessage } from '../snack';

// interfaces
import {
  EditUserDetailsSuccess,
  GetUserDetailsActionSuccess,
  UserDetails,
} from './interfaces';

// helper functions
import { authService } from '../../../utils/auth';

// types
import {
  EDIT_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_SUCCESS,
  LOG_OUT_USER,
} from './types';

/**
 * Get userDetails success action creator
 *
 * @returns {GetUserDetailsActionSuccess}
 */
export const getUserDetailsSuccess = (userDetails: UserDetails): GetUserDetailsActionSuccess => {
  return { userDetails, type: GET_USER_DETAILS_SUCCESS };
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
 * @param userId
 */
export const getUserDetails = userId => (dispatch, getState, http) => {
  return http.get(`user/${userId}`, { cache: true })
    .then((response) => {
      return dispatch(getUserDetailsSuccess(response.data.data));
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
  return http.patch(`user/${userId}`)
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
  ...authService.getUser().userdata,
  permissions: {},
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
        ...action.userDetails,
      };
    case EDIT_USER_DETAILS_SUCCESS:
      return {
        ...state,
        center: action.userCenter,
      };
    default:
      return state;
  }
};

export default reducer;
