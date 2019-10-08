import { Schedule, Status } from '../../store/modules/timeSchedules/interfaces';

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
}

export interface WaterCyclesPageState {
  isLoading: boolean;
  isEditMode: boolean;
  isChecked: boolean;
  schedules: any;
  isDeleteModal: boolean;
  action: string;
  id: string;
  statusClass: string;
}
