// thunk
import { displaySnackMessage } from '@modules/snack';

// interfaces
import {
  SocialAuthActionFailure,
  SocialAuthActionRequest,
  SocialAuthActionSuccess
} from '@modules/socialAuth/interfaces';

// types
import {
  SOCIAL_AUTH_FAILURE,
  SOCIAL_AUTH_REQUEST,
  SOCIAL_AUTH_SUCCESS
} from '@modules/socialAuth/types';

// helpers
import { authService } from '@utils/auth';

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
export const socialAuthSuccess = (url): SocialAuthActionSuccess => ({
  url,
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
 */
export const socialAuthentication = () => (dispatch, getState, http) => {
  dispatch(socialAuthRequest());
  return http.get(process.env.SOCIAL_AUTH_URL)
    .then(response => {
      window.location.replace(process.env.SOCIAL_AUTH_URL || '');
      // authService.saveToken(response.data.response.data.token);
      dispatch(socialAuthSuccess(response));
      const {message} = response.data.response;
      dispatch(displaySnackMessage(`${message}`));
      // window.location.replace('/water-cycles');
    })
    .catch(errors => {
      const error = 'Something went wrong with the authentication. Kindly try again.';
      dispatch(socialAuthFailure(errors));
      dispatch(displaySnackMessage(`${errors.message}`));
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
