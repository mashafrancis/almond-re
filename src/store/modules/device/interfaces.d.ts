import { ADD_DEVICE_FAILURE, ADD_DEVICE_REQUEST, ADD_DEVICE_SUCCESS } from '@modules/device/types';

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

export interface NewDevice {
  device: string;
}
