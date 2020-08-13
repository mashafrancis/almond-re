import moment from 'moment';

/**
 * This function validates the time schedules to be one hour apart
 * @returns boolean
 */
export const validateOneHourTime = (schedules: string[], newTime: string): boolean => {
  let diff: number | undefined = 0;
  const oneHour = 60 * 60 * 1000;

  for (const item of schedules) {
    const current = moment(newTime).format('hh:mm:ss');
    const availableSchedule = moment(item).format('hh:mm:ss');
    diff = moment(current, 'H:mm:ss').diff(moment(availableSchedule, 'H:mm:ss'));
  }

  return Math.abs(diff) < oneHour;
};
