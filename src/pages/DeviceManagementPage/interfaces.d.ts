import { Device } from '@modules/user/interfaces';

export interface DeviceManagementProps {
  getAllDevices: () => Promise<any>;
  editDevice: (id, device) => Promise<any>;
  addNewDevice: (device) => Promise<any>;
  deleteDevice: (id) => Promise<any>;
  displaySnackMessage?: (message) => Promise<any>;
  devices: Device[];
  activeDevice: string;
}

export interface DeviceManagementState {
  isEditMode: boolean;
  devices: any;
  isDeleteModal: boolean;
  showDeviceModal: boolean;
  isFormModalOpen: boolean;
  deviceId: string;
  deviceToEdit: string;
  selectedDevice: string;
}
