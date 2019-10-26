import { Location } from 'history';
import { Schedule, Status } from 'modules/timeSchedules/interfaces';

export interface WaterCyclesPageProps {
  getAllSchedules: () => Promise<any>;
  deleteSingleSchedule: (id) => void;
  displaySnackMessage?: (message) => Promise<any>;
  togglePump?: (state) => Promise<any>;
  getPumpStatus: () => Promise<any>;
  status?: Status;
  error?: object;
  schedules: Schedule[];
  match: {
    url: string
  };
  isLoading: boolean;
  location: Location;
}

export interface WaterCyclesPageState {
  isEditMode: boolean;
  isChecked: boolean;
  schedules: any;
  isDeleteModal: boolean;
  action: string;
  id: string;
  statusClass: string;
}
