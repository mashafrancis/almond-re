import { Schedule, Status } from '@modules/timeSchedules/interfaces';
import { Device } from '@modules/user/interfaces';
import { Location } from 'history';

export interface WaterCyclesPageProps {
  addNewSchedule: (schedule) => Promise<any>;
  editSchedule: (id, schedule) => Promise<any>;
  getAllSchedules: (id) => Promise<any>;
  deleteSingleSchedule: (id) => Promise<any>;
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
  scheduleId: string;
  statusClass: string;
  isEnabled: boolean;
  isFormModalOpen: boolean;
  showScheduleModal: boolean;
  scheduleToEdit: string;
  isActionDone: boolean;
  isLoading: boolean;
}
