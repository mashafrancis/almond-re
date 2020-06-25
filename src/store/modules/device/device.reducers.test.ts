// thunks
import {
  activateDeviceFailure,
  activateDeviceRequest,
  activateDeviceSuccess,
  addDeviceFailure,
  addDeviceRequest,
  addDeviceSuccess,
  deleteSingleDeviceFailure,
  deleteSingleDeviceRequest,
  deleteSingleDeviceSuccess,
  deviceInitialState,
  editDeviceFailure,
  editDeviceRequest,
  editDeviceSuccess,
  getDevicesFailure,
  getDevicesRequest,
  getDevicesSuccess,
  reducer,
  verifyDeviceFailure,
  verifyDeviceRequest,
  verifyDeviceSuccess,
} from '@modules/device/index';

// fixtures
import {
  activateDevicePayload,
  deviceIdPayload,
  devicePayload,
  devices,
  id
} from '@modules/device/fixtures';
import { errorMessage } from '../../../testHelpers';

describe('Device reducer', () => {
  it('should return initial state if action type doesn\'t match', () => {
    const newState = reducer(deviceInitialState, { type: 'fakeType' });
    expect(newState).toEqual(deviceInitialState);
  });

  describe('Add new device', () => {
    it('should dispatch ADD_DEVICE_REQUEST', () => {
      const addNewDeviceRequestAction = addDeviceRequest();
      const deviceState = reducer(deviceInitialState, addNewDeviceRequestAction);

      expect(deviceState.isLoading).toBeTruthy();
      expect(deviceState.errors).toBe(null);
    });

    it('should dispatch ADD_DEVICE_SUCCESS', () => {
      const addNewDeviceSuccessAction = addDeviceSuccess(devicePayload);
      const deviceState = reducer(deviceInitialState, addNewDeviceSuccessAction);

      expect(deviceState.isLoading).toBeFalsy();
      expect(deviceState.errors).toBe(null);
    });

    it('should dispatch ADD_DEVICE_FAILURE', () => {
      const addNewDeviceFailureAction = addDeviceFailure(errorMessage);
      const deviceState = reducer(deviceInitialState, addNewDeviceFailureAction);

      expect(deviceState.isLoading).toBeFalsy();
      expect(deviceState.errors).toBe(errorMessage);
    });
  });

  describe('Verify user device', () => {
    it('should dispatch USER_VERIFY_DEVICE_REQUEST', () => {
      const userVerifyDeviceRequestAction = verifyDeviceRequest();
      const deviceState = reducer(deviceInitialState, userVerifyDeviceRequestAction);

      expect(deviceState.isLoading).toBeTruthy();
      expect(deviceState.errors).toBe(null);
    });

    it('should dispatch USER_VERIFY_DEVICE_SUCCESS', () => {
      const userVerifyDeviceSuccessAction = verifyDeviceSuccess(deviceIdPayload);
      const deviceState = reducer(deviceInitialState, userVerifyDeviceSuccessAction);

      expect(deviceState.isLoading).toBeFalsy();
      expect(deviceState.errors).toBe(null);
    });

    it('should dispatch USER_VERIFY_DEVICE_FAILURE', () => {
      const userVerifyDeviceFailureAction = verifyDeviceFailure(errorMessage);
      const deviceState = reducer(deviceInitialState, userVerifyDeviceFailureAction);

      expect(deviceState.isLoading).toBeFalsy();
      expect(deviceState.errors).toBe(errorMessage);
    });
  });

  describe('Activate device', () => {
    it('should dispatch ACTIVATE_DEVICE_REQUEST', () => {
      const activateDeviceRequestAction = activateDeviceRequest();
      const deviceState = reducer(deviceInitialState, activateDeviceRequestAction);

      expect(deviceState.isLoading).toBeTruthy();
      expect(deviceState.errors).toBe(null);
    });

    it('should dispatch ACTIVATE_DEVICE_SUCCESS', () => {
      const activateDeviceSuccessAction = activateDeviceSuccess(activateDevicePayload);
      const deviceState = reducer(deviceInitialState, activateDeviceSuccessAction);

      expect(deviceState.isLoading).toBeFalsy();
      expect(deviceState.errors).toBe(null);
    });

    it('should dispatch ACTIVATE_DEVICE_FAILURE', () => {
      const activateDeviceFailureAction = activateDeviceFailure(errorMessage);
      const deviceState = reducer(deviceInitialState, activateDeviceFailureAction);

      expect(deviceState.isLoading).toBeFalsy();
      expect(deviceState.errors).toBe(errorMessage);
    });
  });

  describe('Get devices', () => {
    it('should dispatch GET_DEVICES_REQUEST', () => {
      const getDevicesRequestAction = getDevicesRequest();
      const deviceState = reducer(deviceInitialState, getDevicesRequestAction);

      expect(deviceState.isLoading).toBeTruthy();
      expect(deviceState.errors).toBe(null);
    });

    it('should dispatch GET_DEVICES_SUCCESS', () => {
      const getDevicesSuccessAction = getDevicesSuccess(devices.data);
      const deviceState = reducer(deviceInitialState, getDevicesSuccessAction);

      expect(deviceState.isLoading).toBeFalsy();
      expect(deviceState.errors).toBe(null);
    });

    it('should dispatch GET_DEVICES_FAILURE', () => {
      const getDeviceFailureAction = getDevicesFailure(errorMessage);
      const deviceState = reducer(deviceInitialState, getDeviceFailureAction);

      expect(deviceState.isLoading).toBeFalsy();
      expect(deviceState.errors).toBe(errorMessage);
    });
  });

  describe('Delete device', () => {
    it('should dispatch DELETE_DEVICE_REQUEST', () => {
      const deleteDeviceRequestAction = deleteSingleDeviceRequest();
      const deviceState = reducer(deviceInitialState, deleteDeviceRequestAction);

      expect(deviceState.isLoading).toBeTruthy();
      expect(deviceState.errors).toBe(null);
    });

    it('should dispatch DELETE_DEVICE_SUCCESS', () => {
      const deleteDeviceSuccessAction = deleteSingleDeviceSuccess(deviceIdPayload.id);
      const deviceState = reducer(deviceInitialState, deleteDeviceSuccessAction);

      expect(deviceState.isLoading).toBeFalsy();
      expect(deviceState.errors).toBe(null);
    });

    it('should dispatch DELETE_DEVICE_FAILURE', () => {
      const deleteDeviceFailureAction = deleteSingleDeviceFailure(errorMessage);
      const deviceState = reducer(deviceInitialState, deleteDeviceFailureAction);

      expect(deviceState.isLoading).toBeFalsy();
      expect(deviceState.errors).toBe(errorMessage);
    });
  });

  describe('Edit device', () => {
    it('should dispatch EDIT_DEVICE_REQUEST', () => {
      const editDeviceRequestAction = editDeviceRequest();
      const deviceState = reducer(deviceInitialState, editDeviceRequestAction);

      expect(deviceState.isLoading).toBeTruthy();
      expect(deviceState.errors).toBe(null);
    });

    it('should dispatch EDIT_DEVICE_SUCCESS', () => {
      const editDeviceSuccessAction = editDeviceSuccess(id, devicePayload);
      const deviceState = reducer(deviceInitialState, editDeviceSuccessAction);

      expect(deviceState.isLoading).toBeFalsy();
      expect(deviceState.errors).toBe(null);
    });

    it('should dispatch EDIT_DEVICE_FAILURE', () => {
      const editDeviceFailureAction = editDeviceFailure(errorMessage);
      const deviceState = reducer(deviceInitialState, editDeviceFailureAction);

      expect(deviceState.isLoading).toBeFalsy();
      expect(deviceState.errors).toBe(errorMessage);
    });
  });
});
