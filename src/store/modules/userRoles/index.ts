// thunks
import {displaySnackMessage} from '@modules/snack';
// interfaces
import {
  CreateUserRolesActionSuccess,
  GetUserRolesActionFailure,
  GetUserRolesActionRequest,
  GetUserRolesActionSuccess,
  UserDeleteRolesSuccess,
  UserEditRolesSuccess
} from './interfaces';
// types
import {
  CREATE_USER_ROLES_SUCCESS,
  DELETE_USER_ROLES_SUCCESS,
  EDIT_USER_ROLES_SUCCESS,
  GET_USER_ROLES_FAILURE,
  GET_USER_ROLES_REQUEST,
  GET_USER_ROLES_SUCCESS
} from './types';
import {Action, ErrorObject} from '../../../shared.interfaces';

/**
 * Create user roles success action creator
 *
 * @param {UserRole} userRole
 * @returns {CreateUserRolesActionSuccess}
 */
export const createUserRoleSuccess = (userRole: any): CreateUserRolesActionSuccess => ({
  userRole,
  type: CREATE_USER_ROLES_SUCCESS,
});

/**
 * Get all schedules request
 *
 * @returns {GetAllSchedulesActionRequest}
 */
export const getUserRolesRequest = (): GetUserRolesActionRequest => ({
  type: GET_USER_ROLES_REQUEST,
  isLoading: true,
});

/**
 * Get user roles success action creator
 * @returns {GetUserRolesActionSuccess}
 * @param allRolesAndPermissions
 */
export const getUserRolesSuccess = (
  allRolesAndPermissions: { data: any; permissions: any; resources: any; }
): GetUserRolesActionSuccess => ({
  userRoles: allRolesAndPermissions.data,
  permissions: allRolesAndPermissions.permissions,
  resources: allRolesAndPermissions.resources,
  isLoading: false,
  type: GET_USER_ROLES_SUCCESS,
});

/**
 * Get all schedules failure
 * @returns {GetAllSchedulesActionRequest}
 */
export const getUserRolesFailure = (errors: any): GetUserRolesActionFailure => ({
  errors,
  type: GET_USER_ROLES_FAILURE,
  isLoading: false,
});

/**
 *
 * Delete user roles success action creator
 * @returns {UserDeleteRolesSuccess}
 * @param id
 */
export const deleteUserRolesSuccess = (id: string): UserDeleteRolesSuccess => ({
  id,
  type: DELETE_USER_ROLES_SUCCESS,
});

/**
 * Update user roles success action creator
 * @param {UserRole[], string} userRole
 * @param id
 * @returns {UserEditRolesSuccess}
 */
export const editUserRoleSuccess = (userRole: any, id: string): UserEditRolesSuccess => ({
  id,
  userRole,
  type: EDIT_USER_ROLES_SUCCESS,
});

/**
 * Create user role thunk
 * @param {Object} userRole
 * @returns {Function}
 */
export const createUserRole = (userRole: any) => (
  dispatch: any,
  getState: any,
  http: { post: (arg0: string, arg1: any) => Promise<{ data: { data: any; }; }>; }
) => {
  http.post('/roles', userRole)
    .then((response: { data: { data: any; }; }) => {
      dispatch(createUserRoleSuccess(response.data.data));
      dispatch(displaySnackMessage('User Role successfully created'));
    })
    .catch((error: ErrorObject) =>
      dispatch(displaySnackMessage(error.response.data.message))
    );
}

/**
 * Delete user roles thunk
 * @returns {Function}
 * @param id
 */
export const deleteUserRole = (id: string) => (
  dispatch: any,
  getState: any,
  http: { delete: (arg0: string) => Promise<any>; }
) => {
  http.delete(`/roles/${id}`)
    .then(() => {
      dispatch(deleteUserRolesSuccess(id));
      dispatch(displaySnackMessage('Role has been deleted successfully'));
    })
    .catch(error => {
      dispatch(displaySnackMessage(error.response.data.message));
    });
};

/**
 * Get user roles thunk
 * @returns {Function}
 */
export const getUserRoles = () => (
  dispatch: any,
  getState: any,
  http: { get: (arg0: string) => Promise<any>; }
) => {
  dispatch(getUserRolesRequest());
  return http.get('/roles?include=permissions&include=resources')
    .then(response => dispatch(getUserRolesSuccess(response.data)))
    .catch(error => {
      dispatch(getUserRolesFailure(error.message));
      dispatch(displaySnackMessage(error.message));
    });
};

/**
 * Edit a user role thunk
 * @param {Object} updatedRolePayload
 * @returns {Function}
 */
export const editUserRole = (updatedRolePayload: { id: string; }) => (
  dispatch: any,
  getState: any,
  http: { patch: (arg0: string, arg1: { id: string; }) => Promise<{ data: { data: any; }; }>; }
) => {
  const {id} = updatedRolePayload;
  return http.patch(`/roles/${id}`, updatedRolePayload)
    .then((response: { data: { data: any; }; }) => {
      dispatch(editUserRoleSuccess(response.data.data, id));
      dispatch(displaySnackMessage('Role updated successfully'));
    })
    .catch((error: ErrorObject) => {
      if (error.response.status === 400) {
        dispatch(displaySnackMessage('Please format the fields properly'));
      } else {
        dispatch(displaySnackMessage(error.response.data.message));
      }
    });
};

// Set the initial role state
const userRoleInitialState = {
  data: [],
  isLoading: true,
};

const reducer = (state: { data: any[], isLoading: boolean } = userRoleInitialState, action: Action) => {
  switch (action.type) {
    case GET_USER_ROLES_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case GET_USER_ROLES_SUCCESS:
      return {
        ...state,
        data: action.userRoles,
        resources: action.resources,
        permissions: action.permissions,
        isLoading: action.isLoading,
      };
    case GET_USER_ROLES_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: action.isLoading,
      };
    case DELETE_USER_ROLES_SUCCESS:
      return {
        ...state,
        data: [...state.data].filter(userRole => action.id !== userRole._id),
      };
    case EDIT_USER_ROLES_SUCCESS:
      return {
        ...state,
        data: [...state.data].map(role => role._id === action.userRole._id ? {
          ...role,
          ...action.userRole,
        } : role),
      };
    case CREATE_USER_ROLES_SUCCESS:
      return {
        ...state,
        data: [action.userRole, ...state.data],
      };
    default:
      return state;
  }
};

export default reducer;
