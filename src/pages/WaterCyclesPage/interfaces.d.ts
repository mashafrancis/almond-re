import { Schedule } from '../../store/modules/timeSchedules/interfaces';

export interface WaterCyclesPageProps {
  getAllSchedules: () => Promise<any>;
  deleteSingleSchedule: (id) => void;
  displaySnackMessage?: (message) => Promise<any>;
  error?: object;
  schedules: Schedule[];
  match: {
    url: string
  };
}

export interface WaterCyclesPageState {
  isLoading: boolean;
  isEditMode: boolean;
  schedules: any;
  isDeleteModal: boolean;
  action: string;
  id: string;
}
