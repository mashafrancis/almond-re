// thunks
import {
  ActivateDeviceActionFailure,
  ActivateDeviceActionRequest,
  ActivateDeviceActionSuccess,
  AddDeviceActionFailure,
  AddDeviceActionRequest,
  AddDeviceActionSuccess, Device,
  NewDevice,
  UserVerifyDeviceActionFailure,
  UserVerifyDeviceActionRequest,
  UserVerifyDeviceActionSuccess,
  VerifyDevice
} from '@modules/device/interfaces';

import {
  ACTIVATE_DEVICE_FAILURE,
  ACTIVATE_DEVICE_REQUEST,
  ACTIVATE_DEVICE_SUCCESS,
  ADD_DEVICE_FAILURE,
  ADD_DEVICE_REQUEST,
  ADD_DEVICE_SUCCESS,
  USER_VERIFY_DEVICE_FAILURE,
  USER_VERIFY_DEVICE_REQUEST,
  USER_VERIFY_DEVICE_SUCCESS
} from '@modules/device/types';
import { displaySnackMessage } from '../snack';

/**
 * Add a new device request
 *
 * @returns {AddDeviceActionRequest}
 */
export const addDeviceRequest = (): AddDeviceActionRequest => ({
  type: ADD_DEVICE_REQUEST,
  isLoading: true,
});

/**
 * Add new device success
 *
 * @param {NewDevice} device
 * @returns {AddDeviceActionSuccess}
 */
export const addDeviceSuccess = (device: NewDevice): { isLoading: boolean; type: string; device: NewDevice } => ({
  device,
  type: ADD_DEVICE_SUCCESS,
  isLoading: false,
});

/**
 * Add new schedule failure
 *
 * @returns {AddSchedulesActionFailure}
 */
export const addDeviceFailure = (errors): AddDeviceActionFailure => ({
  errors,
  type: ADD_DEVICE_FAILURE,
});

/**
 * Add a new device request
 *
 * @returns {UserVerifyDeviceActionRequest}
 */
export const verifyDeviceRequest = (): UserVerifyDeviceActionRequest => ({
  type: USER_VERIFY_DEVICE_REQUEST,
  isLoading: true,
});

/**
 * Add new device success
 *
 * @returns {AddDeviceActionSuccess}
 * @param id
 */
export const verifyDeviceSuccess = (id: VerifyDevice): UserVerifyDeviceActionSuccess => ({
  id,
  type: USER_VERIFY_DEVICE_SUCCESS,
  isLoading: false,
});

/**
 * Add new schedule failure
 *
 * @returns {UserVerifyDeviceActionFailure}
 */
export const verifyDeviceFailure = (errors): UserVerifyDeviceActionFailure => ({
  errors,
  type: USER_VERIFY_DEVICE_FAILURE,
});

/**
 * Activate device request
 *
 * @returns {UserVerifyDeviceActionRequest}
 */
export const activateDeviceRequest = (): ActivateDeviceActionRequest => ({
  type: ACTIVATE_DEVICE_REQUEST,
  isLoading: true,
});

/**
 * Activate device success
 *
 * @returns {AddDeviceActionSuccess}
 * @param activeDevice
 */
export const activateDeviceSuccess = (activeDevice: Device):
  { isLoading: boolean; activeDevice: Device; type: string } => ({
    activeDevice,
    type: ACTIVATE_DEVICE_SUCCESS,
    isLoading: false,
  });

/**
 * Activate device failure
 *
 * @returns {UserVerifyDeviceActionFailure}
 */
export const activateDeviceFailure = (errors): ActivateDeviceActionFailure => ({
  errors,
  type: ACTIVATE_DEVICE_FAILURE,
});

/**
 * Thunk action creator
 * Add a new device
 *
 * @returns {Function} action type and payload
 */
export const addNewDevice = device => (dispatch, getState, http) => {
  dispatch(addDeviceRequest());
  return http.post('devices', device)
    .then((response) => {
      dispatch(addDeviceSuccess(response.data.data));
      dispatch(displaySnackMessage(response.data.message));
      // window.location.replace('/water-cycles');
    })
    .catch((error) => {
      const message = error.response.data.message;
      dispatch(addDeviceFailure(message));
      dispatch(displaySnackMessage(message));
    });
};

export const verifyUserDevice = id => (dispatch, getState, http) => {
  dispatch(verifyDeviceRequest());
  return http.post('my-device', id)
    .then((response) => {
      dispatch(verifyDeviceSuccess(response.data.data));
      dispatch(displaySnackMessage(response.data.message));
      window.location.replace('/dashboard');
    })
    .catch((error) => {
      const message = error.response.data.message;
      dispatch(displaySnackMessage(message));
      dispatch(verifyDeviceFailure(message));
    });
};

export const activateDevice = id => (dispatch, getState, http) => {
  dispatch(activateDeviceRequest());
  return http.patch('active-device', id)
    .then((response) => {
      dispatch(activateDeviceSuccess(response.data.data));
      dispatch(displaySnackMessage(response.data.message));
    })
    .catch((error) => {
      const message = error.response.data.message;
      dispatch(verifyDeviceFailure(message));
      dispatch(displaySnackMessage(message));
    });
};

export const deviceInitialState = {
  isLoading: true,
  errors: {},
  data: [],
  activeDevice: {},
};

export const reducer = (state = deviceInitialState, action) => {
  switch (action.type) {
    case ADD_DEVICE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case ADD_DEVICE_SUCCESS:
      return {
        ...state,
        errors: null,
        isLoading: action.isLoading,
        data: [action.device, ...state.data],
      };
    case ADD_DEVICE_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    case USER_VERIFY_DEVICE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case USER_VERIFY_DEVICE_SUCCESS:
      return {
        ...state,
        errors: null,
        isLoading: action.isLoading,
        data: [action.device, ...state.data],
      };
    case USER_VERIFY_DEVICE_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    case ACTIVATE_DEVICE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case ACTIVATE_DEVICE_SUCCESS:
      return {
        ...state,
        errors: null,
        isLoading: action.isLoading,
        activeDevice: action.activeDevice,
      };
    case ACTIVATE_DEVICE_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default reducer;
