// thunks
import { displaySnackMessage } from '../snack';

import {
  AddDeviceActionFailure,
  AddDeviceActionRequest,
  AddDeviceActionSuccess,
  NewDevice
} from '@modules/device/interfaces';

import {
  ADD_DEVICE_FAILURE,
  ADD_DEVICE_REQUEST,
  ADD_DEVICE_SUCCESS
} from '@modules/device/types';
import http from '@utils/helpers/http';

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
 * Thunk action creator
 * Add a new device
 *
 * @returns {Function} action type and payload
 */
export const addNewDevice = device => (dispatch, getState, http) => {
  dispatch(addDeviceRequest());
  return http.post('my-device', device)
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

export const deviceInitialState = {
  isLoading: true,
  errors: {},
  data: [],
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
    default:
      return state;
  }
};

export default reducer;
