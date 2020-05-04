// thunks
import {
  deviceInitialState,
  reducer,
} from '@modules/device/index';

// types
import {
  ADD_DEVICE_FAILURE,
  ADD_DEVICE_REQUEST,
  ADD_DEVICE_SUCCESS,
} from '@modules/device/types';

// fixtures
import { requestPayload } from '@modules/device/fixtures';

describe('Device reducer', () => {
  const addDeviceRequest = {
    type: ADD_DEVICE_REQUEST,
    isLoading: true,
  };

  const addDeviceSuccess = {
    device: requestPayload,
    type: ADD_DEVICE_SUCCESS,
    isLoading: false,
  };

  const addDeviceFailure = {
    type: ADD_DEVICE_FAILURE,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(deviceInitialState);
  });

  it('should handle ADD_DEVICE_REQUEST', () => {
    const newDeviceState = reducer(deviceInitialState, addDeviceRequest);

    expect(newDeviceState).toEqual({
      ...deviceInitialState,
    });
  });

  it('should handle ADD_DEVICE_SUCCESS', () => {
    const newDeviceState = reducer(deviceInitialState, addDeviceSuccess);

    expect(newDeviceState.isLoading).toEqual(false);
  });

  it.skip('should handle ADD_DEVICE_FAILURE', () => {
    const newDeviceState = reducer(deviceInitialState, addDeviceFailure);

    expect(newDeviceState).toEqual({
      ...deviceInitialState,
      errors: deviceInitialState.errors,
    });
  });
});
