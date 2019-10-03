import {
  SOCIAL_AUTH_FAILURE,
  SOCIAL_AUTH_PROVIDER,
  SOCIAL_AUTH_REQUEST,
  SOCIAL_AUTH_SUCCESS
} from 'modules/socialAuth/types';

export interface SocialAuthActionRequest {
  type: SOCIAL_AUTH_REQUEST;
}

export interface SocialAuthActionSuccess {
  type: SOCIAL_AUTH_SUCCESS;
  payload: any;
}

export interface SocialAuthActionFailure {
  type: SOCIAL_AUTH_FAILURE;
  errors: any;
}

export interface SocialAuthActionProvider {
  type: SOCIAL_AUTH_PROVIDER;
  errors: any;
}

export default interface User {
  username?: string;
  email: string;
  password?: string;
}
