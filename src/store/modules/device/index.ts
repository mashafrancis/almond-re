// thunks
import {
  ActivateDeviceActionFailure,
  ActivateDeviceActionRequest,
  AddDeviceActionFailure,
  AddDeviceActionRequest,
  AddDeviceActionSuccess,
  DeleteDeviceActionFailure,
  DeleteDeviceActionRequest,
  DeleteDeviceActionSuccess,
  Device,
  EditDeviceActionFailure,
  EditDeviceActionRequest,
  EditDeviceActionSuccess,
  GetAllDevicesActionFailure,
  GetAllDevicesActionRequest,
  GetAllDevicesActionSuccess,
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
  DELETE_DEVICE_FAILURE,
  DELETE_DEVICE_REQUEST,
  DELETE_DEVICE_SUCCESS,
  EDIT_DEVICE_FAILURE,
  EDIT_DEVICE_REQUEST,
  EDIT_DEVICE_SUCCESS,
  GET_DEVICES_FAILURE,
  GET_DEVICES_REQUEST,
  GET_DEVICES_SUCCESS,
  USER_VERIFY_DEVICE_FAILURE,
  USER_VERIFY_DEVICE_REQUEST,
  USER_VERIFY_DEVICE_SUCCESS
} from '@modules/device/types';
import {
  deleteSingleScheduleFailure,
  deleteSingleScheduleRequest,
  deleteSingleScheduleSuccess,
  editScheduleFailure
} from '@modules/timeSchedules';
import { DeleteScheduleActionFailure, EditScheduleActionFailure } from '@modules/timeSchedules/interfaces';
import {
  DELETE_SCHEDULE_FAILURE,
  DELETE_SCHEDULE_REQUEST,
  DELETE_SCHEDULE_SUCCESS, EDIT_SCHEDULE_FAILURE, EDIT_SCHEDULE_REQUEST, EDIT_SCHEDULE_SUCCESS
} from '@modules/timeSchedules/types';
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
  isLoading: false,
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
  isLoading: false,
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
 * Get all devices request
 *
 * @returns {GetAllDevicesActionRequest}
 */
export const getDevicesRequest = (): GetAllDevicesActionRequest => ({
  type: GET_DEVICES_REQUEST,
  isLoading: true,
});

/**
 * Get all devices success
 *
 * @returns {GetAllDevicesActionSuccess}
 * @param devices
 */
export const getDevicesSuccess = (devices: Device[]): GetAllDevicesActionSuccess => ({
  devices,
  type: GET_DEVICES_SUCCESS,
  isLoading: false,
});

/**
 * Get all devices failure
 *
 * @returns {GetAllDevicesActionFailure}
 */
export const getDevicesFailure = (errors): GetAllDevicesActionFailure => ({
  errors,
  type: GET_DEVICES_FAILURE,
  isLoading: false,
});

/**
 * Delete single device request
 *
 * @returns {DeleteDeviceActionRequest}
 */
export const deleteSingleDeviceRequest = (): DeleteDeviceActionRequest => ({
  type: DELETE_DEVICE_REQUEST,
  isLoading: true,
});

/**
 * Delete single device success
 *
 * @returns {DeleteDeviceActionSuccess}
 * @param id
 */
export const deleteSingleDeviceSuccess = (id): DeleteDeviceActionSuccess => ({
  id,
  type: DELETE_DEVICE_SUCCESS,
  isLoading: false,
});

/**
 * Delete single schedule failure
 *
 * @returns {DeleteScheduleActionFailure}
 */
export const deleteSingleDeviceFailure = (errors): DeleteDeviceActionFailure => ({
  errors,
  type: DELETE_DEVICE_FAILURE,
});

/**
 * Edit a schedule request
 *
 * @returns {EditDeviceActionRequest}
 */
export const editDeviceRequest = (): EditDeviceActionRequest => ({
  type: EDIT_DEVICE_REQUEST,
  isLoading: true,
});

/**
 * Edit device success
 *
 * @param id
 * @param device
 * @returns {EditDeviceActionSuccess}
 */
export const editDeviceSuccess = (id, device: NewDevice): EditDeviceActionSuccess => ({
  id,
  device,
  type: EDIT_DEVICE_SUCCESS,
  isLoading: false,
});

/**
 * Add edit device failure
 *
 * @returns {EditDeviceActionFailure}
 */
export const editDeviceFailure = (errors): EditDeviceActionFailure => ({
  errors,
  type: EDIT_DEVICE_FAILURE,
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

export const getAllDevices = () => (dispatch, getState, http) => {
  dispatch(getDevicesRequest());
  const abortController = new AbortController();
  const signal = abortController.signal;
  return http.get('devices', { signal: signal })
    .then((response) => {
      dispatch(getDevicesSuccess(response.data.data));
    })
    .catch((error) => {
      const message = error.response.data.message;
      dispatch(getDevicesFailure(message));
      dispatch(displaySnackMessage(message));
    });
};

export const editDevice = (id, device) => (dispatch, getState, http) => {
  dispatch(editDeviceRequest());
  return http.patch(`devices/${id}`, device)
    .then((response) => {
      dispatch(editDeviceSuccess(id, response.data.data));
      dispatch(displaySnackMessage(response.data.message));
    })
    .catch((error) => {
      const message = error.response.data.message;
      dispatch(editScheduleFailure(message));
      dispatch(displaySnackMessage(message));
    });
};

export const deleteDevice = id => (dispatch, getState, http) => {
  dispatch(deleteSingleDeviceRequest());
  return http.delete(`devices/${id}`)
    .then((response) => {
      dispatch(deleteSingleDeviceSuccess(id));
      dispatch(displaySnackMessage(response.data.message));
    })
    .catch((error) => {
      const message = error.response.data.message;
      dispatch(deleteSingleDeviceFailure(message));
      dispatch(displaySnackMessage(message));
    });
};

export const deviceInitialState = {
  isLoading: true,
  errors: null,
  data: [],
  activeDevice: {},
  devices: [],
};

export const reducer = (state: {
  isLoading: boolean, errors: any, data: Device[], activeDevice: object, devices: any[]
  } = deviceInitialState, action) => {
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
        devices: [action.device, ...state.devices],
      };
    case ADD_DEVICE_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: action.isLoading,
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
        isLoading: action.isLoading,
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
    case GET_DEVICES_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case GET_DEVICES_SUCCESS:
      return {
        ...state,
        devices: action.devices,
        isLoading: action.isLoading,
      };
    case GET_DEVICES_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    case DELETE_DEVICE_REQUEST:
      return {
        ...state,
      };
    case DELETE_DEVICE_SUCCESS:
      return {
        ...state,
        devices: [...state.devices].filter(device => action.id !== device._id),
        errors: null,
      };
    case DELETE_DEVICE_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: false,
      };
    case EDIT_DEVICE_REQUEST:
      return {
        ...state,
      };
    case EDIT_DEVICE_SUCCESS:
      return {
        ...state,
        devices: [...state.devices].map(device => device._id === action.device._id ? ({
          ...device,
          ...action.device,
        }) : device),
        errors: null,
      };
    case EDIT_DEVICE_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default reducer;
