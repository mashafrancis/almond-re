import { Schedule, Status } from '@modules/timeSchedules/interfaces';
import { Device } from '@modules/user/interfaces';
import { Location } from 'history';

export interface WaterCyclesPageProps {
  getAllSchedules: (id) => Promise<any>;
  deleteSingleSchedule: (id) => void;
  displaySnackMessage?: (message) => Promise<any>;
  togglePump?: (state) => Promise<any>;
  getPumpStatus: (id) => Promise<any>;
  toggleScheduleStatus: (id, enabled) => Promise<any>;
  status?: Status;
  error?: object;
  schedules: Schedule[];
  match: {
    url: string
  };
  isLoading: boolean;
  location: Location;
  enabled: boolean;
  devices: Device[];
}

export interface WaterCyclesPageState {
  isEditMode: boolean;
  schedules: any;
  isDeleteModal: boolean;
  action: string;
  id: string;
  statusClass: string;
  isEnabled: boolean;
}
