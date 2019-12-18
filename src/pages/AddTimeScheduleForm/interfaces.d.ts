export interface AddTimeScheduleFormProps {
  addNewSchedule: (schedule) => Promise<any>;
  displaySnackMessage?: (message) => Promise<any>;
  error?: object;
}

export interface AddTimeScheduleFormState {
  isLoading: boolean;
}
