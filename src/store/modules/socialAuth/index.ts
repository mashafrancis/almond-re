import * as firebase from '../../../utils/firebase';

// thunk
import { displaySnackMessage } from 'modules/snack';

// interfaces
import {
  SocialAuthActionFailure,
  SocialAuthActionRequest,
  SocialAuthActionSuccess
} from 'modules/socialAuth/interfaces';

// types
import {
  SOCIAL_AUTH_FAILURE,
  SOCIAL_AUTH_REQUEST,
  SOCIAL_AUTH_SUCCESS
} from 'modules/socialAuth/types';

// helpers
import { authService } from 'utils/auth';

/**
 * Social authentication request
 *
 * @returns {SocialAuthActionRequest}
 */
export const socialAuthRequest = (): SocialAuthActionRequest => ({
  type: SOCIAL_AUTH_REQUEST,
});

/**
 * Social authentication success
 *
 * @returns {SocialAuthActionSuccess}
 */
export const socialAuthSuccess = (payload): SocialAuthActionSuccess => ({
  payload,
  type: SOCIAL_AUTH_SUCCESS,
});

/**
 * Social authentication fail
 *
 * @returns {SocialAuthActionFailure}
 */
export const socialAuthFailure = (errors): SocialAuthActionFailure => ({
  errors,
  type: SOCIAL_AUTH_FAILURE,
});

// actions
/**
 * Thunk action creator
 * Social authentication for a user
 *
 * @returns {Function} action type and payload
 * @param payload
 */
export const socialAuthentication = payload => (dispatch, getState, http) => {
  dispatch(socialAuthRequest());
  return http.post('users.json', payload)
    .then((response) => {
      firebase.firebaseDatabase.ref(`users/${Object.values(response.data)[0]}`)
        .once('value')
        .then((snapshot) => {
          const data = snapshot.val() || 'Anonymous';
          authService.saveToken(data.idToken);
          dispatch(socialAuthSuccess(data.response));
          dispatch(displaySnackMessage('You have successfully logged in.'));
          window.location.replace('/water-cycles');
        });
    })
    .catch((errors) => {
      const error = 'Something went wrong with the authentication. Kindly try again.';
      dispatch(socialAuthFailure(errors));
      dispatch(displaySnackMessage(`${error}`));
    });
};

export const socialAuthenticateState = {
  payload: {},
  errors: {},
  isLoading: false,
};

const reducer = (state = socialAuthenticateState, action) => {
  switch (action.type) {
    case SOCIAL_AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SOCIAL_AUTH_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        error: null,
        isLoading: false,
      };
    case SOCIAL_AUTH_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
