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
  isFetchingUserDetails: boolean;
}

export interface GetUserDetailsActionSuccess {
  user: UserDetails;
  type: GET_USER_DETAILS_SUCCESS;
  isFetchingUserDetails: boolean;
}

export interface GetUserDetailsActionFailure {
  type: GET_USER_DETAILS_FAILURE;
  errors: any;
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
  id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  isVerified?: boolean;
  device?: [
    {
      _id: string;
      verified: boolean;
    }
  ];
}
