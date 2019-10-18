import {
  EDIT_USER_DETAILS_FAILURE,
  EDIT_USER_DETAILS_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  GET_USER_DETAILS_FAILURE,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
} from './types';

export interface GetUserDetailsActionRequest {
  type: GET_USER_DETAILS_REQUEST;
  isGettingUserDetails: boolean;
}

export interface GetUserDetailsActionSuccess {
  user: UserDetails;
  type: GET_USER_DETAILS_SUCCESS;
  isGettingUserDetails: boolean;
}

export interface GetUserDetailsActionFailure {
  type: GET_USER_DETAILS_FAILURE;
}

export interface GetAllUsersSuccess {
  users: UserDetails[];
  type: GET_ALL_USERS_SUCCESS;
}

export interface EditUserDetailsSuccess {
  userDetails: UserDetails;
  type: EDIT_USER_DETAILS_SUCCESS;
}

export interface EditUserDetailsFailure {
  type: EDIT_USER_DETAILS_FAILURE;
}

interface UserDetails {
  id?: string;
  username?: string;
  name?: string;
  email?: string;
  photo?: string;
  userId?: string;
}
