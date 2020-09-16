import {
  Schedule,
  SchedulePayload,
  Status,
  ToggleSchedulePayload
} from '@modules/timeSchedules/interfaces';
import { Device } from '@modules/user/interfaces';
import { Location } from 'history';
import { WaterData } from '@modules/sensorData/interfaces';

export interface WaterCyclesPageProps {
  addNewSchedule: (schedule: SchedulePayload) => Promise<any>;
  editSchedule: (id :string, schedule: SchedulePayload) => Promise<any>;
  getAllSchedules: (id: string) => Promise<any>;
  deleteSingleSchedule: (id :string) => Promise<any>;
  displaySnackMessage?: (message: string) => Promise<any>;
  togglePump: (payload: ToggleSchedulePayload) => Promise<any>;
  getPumpStatus: (id: string) => Promise<any>;
  toggleScheduleStatus: (id: string, payload: ToggleSchedulePayload) => Promise<any>;
  getWaterData: () => Promise<any> | any;
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
  waterData: WaterData
}

export interface WaterCyclesPageState {
  isEditMode: boolean;
  isDeleteModalOpen: boolean;
  scheduleId: string;
  statusClass: string;
  isEnabled: boolean;
  // isFormModalOpen: boolean;
  isScheduleModalOpen: boolean;
  scheduleToEdit: string;
  isActionDone: boolean;
  isLoading: boolean;
  selectedTimeSchedule: any;
  hasError: boolean;
  schedules: Schedule[];
}
