import { Schedule, Status } from '@modules/timeSchedules/interfaces';
import { Location } from 'history';

export interface AnalyticsPageProps {
  getAllSchedules: () => Promise<any>;
  deleteSingleSchedule: (id) => void;
  displaySnackMessage?: (message) => Promise<any>;
  togglePump?: (state) => Promise<any>;
  getPumpStatus: () => Promise<any>;
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
}

export interface AnalyticsPageState {
  isEditMode: boolean;
  schedules: any;
  isDeleteModal: boolean;
  action: string;
  id: string;
  statusClass: string;
  isEnabled: boolean;
}
