import { Permissions, Resources } from '@pages/UserRolesPage/interfaces';
import {
  CREATE_USER_ROLES_SUCCESS,
  DELETE_USER_ROLES_SUCCESS,
  EDIT_USER_ROLES_SUCCESS, GET_USER_ROLES_FAILURE, GET_USER_ROLES_REQUEST,
  GET_USER_ROLES_SUCCESS,
} from './types';

export interface GetUserRolesActionRequest {
  type: GET_USER_ROLES_REQUEST;
  isLoading: boolean;
}

export interface GetUserRolesActionSuccess {
  userRoles: UserRole[];
  permissions?: Permissions;
  resources?: Resources;
  type: GET_USER_ROLES_SUCCESS;
}

export interface GetUserRolesActionFailure {
  type: GET_USER_ROLES_FAILURE;
  isLoading: boolean;
  errors: any;
}

export interface CreateUserRolesActionSuccess {
  type: CREATE_USER_ROLES_SUCCESS;
  userRole: UserRole;
}

export interface UserDeleteRolesSuccess {
  userRoleId: string;
  type: DELETE_USER_ROLES_SUCCESS;
}

export interface UserEditRolesSuccess {
  userRoleId: String;
  userRole: UserRole;
  type: EDIT_USER_ROLES_SUCCESS;
}

export interface Resource {
  _id: string;
  name: string;
}

export interface Permission {
  _id: string;
  type: string;
}

export interface ResourceAccessLevel {
  permissions?: Permission[];
  resource?: Resource;
  [key: string]: any;
}

export interface UserRole {
  description: string;
  users?: Number;
  title: string;
  _id: string;
  resourceAccessLevels?: ResourceAccessLevel[];
}
