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
  errors: {
    [key: string]: string
  };
}
