import { UserRole } from '@modules/userRoles/interfaces';
import {
  EDIT_USER_DETAILS_SUCCESS,
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
  isFetchingUserDetails: boolean;
}

export interface EditUserDetailsSuccess {
  userDetails: UserDetails;
  type: EDIT_USER_DETAILS_SUCCESS;
}

import { FormattedPermissions } from '@utils/helpers/formatPermissions/interfaces';

export interface UserDetails {
  _id: string;
  name: string;
  email: string;
  photo: string;
  isVerified: boolean;
  devices: Device[];
  activeDevice: Device;
  roles: UserRole[];
  permissions?: FormattedPermissions;
  currentRole: UserRole;
}

export interface Device {
  _id: string;
  id: string;
  verified: boolean;
  isEnabled: boolean;
  user: {
    name: string;
  };
}
