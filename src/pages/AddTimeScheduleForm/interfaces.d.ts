export interface AddTimeScheduleFormProps {
  addNewSchedule: (schedule) => Promise<any>;
  displaySnackMessage?: (message) => Promise<any>;
  error?: object;
}

export interface AddTimeScheduleFormState {
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
