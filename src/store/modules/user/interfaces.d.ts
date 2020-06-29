import { ResourceAccessLevel } from '@modules/userRoles/interfaces';
import {
  EDIT_USER_DETAILS_FAILURE,
  EDIT_USER_DETAILS_REQUEST,
  EDIT_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
} from './types';

import { FormattedPermissions } from '@utils/helpers/formatPermissions/interfaces';
// import { Device } from '@modules/device/interfaces';

export interface GetUserDetailsActionSuccess {
  userDetails: UserDetails;
  type: GET_USER_DETAILS_SUCCESS;
}

export interface GetUserDetailsActionFailure {
  type: GET_USER_DETAILS_FAILURE;
  errors: any;
}

export interface EditUserDetailsSuccess {
  userDetails: UserDetails;
  type: EDIT_USER_DETAILS_SUCCESS;
}

export interface EditUserDetailsFailure {
  errors: any;
  type: EDIT_USER_DETAILS_FAILURE;
}

export interface UserDetails {
  _id: string;
  name: string;
  email: string;
  photo: string;
  isVerified: boolean;
  devices: Device[];
  activeDevice: Device;
  roles: Role[];
  permissions?: FormattedPermissions;
  currentRole: CurrentRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface Device {
  _id: string;
  id: string;
  verified: boolean;
  enabled: boolean;
  user: string;
  updatedAt: string;
}

// interface UserDevice extends Device{
//   verified: boolean;
//   devices: Device[]
// }

export interface CurrentRole {
  _id: string,
  title: string,
}

export interface Role {
  description: string;
  title: string;
  _id: string;
  resourceAccessLevels: ResourceAccessLevel[];
}
