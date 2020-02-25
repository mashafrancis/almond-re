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

export interface GetAllDevicesActionRequest {
  type: GET_DEVICES_REQUEST;
  isLoading: boolean;
}

export interface GetAllDevicesActionSuccess {
  devices: Device[];
  type: GET_DEVICES_SUCCESS;
  isLoading: boolean;
}

export interface GetAllDevicesActionFailure {
  type: GET_DEVICES_FAILURE;
  errors: any;
  isLoading: boolean;
}

export interface DeleteDeviceActionRequest {
  type: DELETE_DEVICE_REQUEST;
  isLoading: boolean;
}

export interface DeleteDeviceActionSuccess {
  id: string;
  type: DELETE_DEVICE_SUCCESS;
  isLoading: boolean;
}

export interface DeleteDeviceActionFailure {
  type: DELETE_DEVICE_FAILURE;
  errors: any;
}

export interface EditDeviceActionRequest {
  type: EDIT_DEVICE_REQUEST;
  isLoading: boolean;
}

export interface EditDeviceActionSuccess {
  id: string;
  device: NewDevice;
  type: EDIT_DEVICE_SUCCESS;
  isLoading: boolean;
}

export interface EditDeviceActionFailure {
  type: EDIT_DEVICE_FAILURE;
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
