import { Schedule } from 'modules/timeSchedules/interfaces';

export interface EditTimeScheduleFormProps {
  editSchedule: (id, schedule) => Promise<any>;
  displaySnackMessage?: (message) => Promise<any>;
  error?: object;
  schedules: Schedule[];
  location: {
    pathname: string
  };
}

export interface EditTimeScheduleFormState {
  isLoading: boolean;
  isValid: boolean;
  focused: boolean;
  fields: {
    [key: string]: string | number | any
  };
  dates: {
    [key: string]: string | number
  };
  errors: {
    [key: string]: string
  };
}
