import { UserRole } from '@modules/userRoles/interfaces';
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
  userDetails: UserDetails;
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

import { FormattedPermissions } from '@utils/helpers/formatPermissions/interfaces';

interface UserDetails {
  id: string;
  name: string;
  email: string;
  photo: string;
  isVerified?: boolean;
  devices?: Device[];
  activeDevice?: Device;
  roles?: UserRole;
  permissions?: FormattedPermissions;
}

export interface Device {
  _id: string;
  id: string;
  verified?: boolean;
  isEnabled: boolean;
  user: {
    name: string;
  };
}
