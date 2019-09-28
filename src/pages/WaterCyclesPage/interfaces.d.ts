import { Schedule } from '../../store/modules/timeSchedules/interfaces';

export interface WaterCyclesPageProps {
  getAllSchedules: () => Promise<any>;
  displaySnackMessage?: (message) => Promise<any>;
  error?: object;
  schedules: Schedule[];
}

export interface WaterCyclesPageState {
  isLoading: boolean;
  schedules: any;
}
