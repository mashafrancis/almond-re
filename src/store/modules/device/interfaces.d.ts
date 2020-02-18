import {
  ACTIVATE_DEVICE_FAILURE,
  ACTIVATE_DEVICE_REQUEST,
  ACTIVATE_DEVICE_SUCCESS,
  ADD_DEVICE_FAILURE,
  ADD_DEVICE_REQUEST,
  ADD_DEVICE_SUCCESS,
  USER_VERIFY_DEVICE_FAILURE,
  USER_VERIFY_DEVICE_REQUEST,
  USER_VERIFY_DEVICE_SUCCESS,
} from '@modules/device/types';

export interface AddDeviceActionRequest {
  type: ADD_DEVICE_REQUEST;
  isLoading: boolean;
}

export interface AddDeviceActionSuccess {
  schedule: NewDevice;
  type: ADD_DEVICE_SUCCESS;
  isLoading: boolean;
}

export interface AddDeviceActionFailure {
  type: ADD_DEVICE_FAILURE;
  errors: any;
}

export interface UserVerifyDeviceActionRequest {
  type: USER_VERIFY_DEVICE_REQUEST;
  isLoading: boolean;
}

export interface UserVerifyDeviceActionSuccess {
  id: VerifyDevice;
  type: USER_VERIFY_DEVICE_SUCCESS;
  isLoading: boolean;
}

export interface UserVerifyDeviceActionFailure {
  type: USER_VERIFY_DEVICE_FAILURE;
  errors: any;
}

export interface ActivateDeviceActionRequest {
  type: ACTIVATE_DEVICE_REQUEST;
  isLoading: boolean;
}

export interface ActivateDeviceActionSuccess {
  activeDevice: Device;
  type: ACTIVATE_DEVICE_SUCCESS;
  isLoading: boolean;
}

export interface ActivateDeviceActionFailure {
  type: ACTIVATE_DEVICE_FAILURE;
  errors: any;
}

export interface NewDevice {
  device: string;
}

export interface VerifyDevice {
  id: string;
}

export interface Device {
  id: string;
  _id: string;
  verified: boolean;
  user?: string;
}
